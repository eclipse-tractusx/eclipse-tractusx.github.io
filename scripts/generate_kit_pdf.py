#********************************************************************************
# Copyright (c) 2026 Contributors to the Eclipse Foundation
#
# See the NOTICE file(s) distributed with this work for additional
# information regarding copyright ownership.
#
# This program and the accompanying materials are made available under the
# terms of the Apache License, Version 2.0 which is available at
# https://www.apache.org/licenses/LICENSE-2.0.
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.
#
# SPDX-License-Identifier: Apache-2.0
#*******************************************************************************/

#!/usr/bin/env python3
r"""
Generate a single PDF from markdown files in a specified folder.
This script combines all markdown files from the specified folder
and converts them to a PDF document.

Usage:
    python generate_kit_pdf.py <folder_path> [output_file]
    
Examples:
    python generate_kit_pdf.py docs-kits/kit-template
    python generate_kit_pdf.py "docs-kits/kits/Business Partner Kit" business-partner-kit.pdf
"""

import os
import sys
import argparse
from pathlib import Path
import markdown
import re
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration
from datetime import datetime

def collect_markdown_files(base_path):
    """
    Dynamically collect all markdown and MDX files from the kit-template directory.
    Files are sorted to maintain a logical order:
    1. README.md first
    2. Other files in alphabetical order by path
    """
    md_files = []
    
    # Find all .md and .mdx files recursively
    for pattern in ['**/*.md', '**/*.mdx']:
        md_files.extend(base_path.glob(pattern))
    
    # Remove duplicates and sort
    md_files = list(set(md_files))
    
    # Custom sort: README.md first, then alphabetically by path
    def sort_key(path):
        relative = path.relative_to(base_path)
        # README.md gets priority 0
        if path.name == 'README.md' and path.parent == base_path:
            return (0, str(relative))
        # Everything else sorted alphabetically
        return (1, str(relative))
    
    md_files.sort(key=sort_key)
    
    return md_files

def clean_markdown_content(content, base_path):
    """Clean and process markdown content, handling images and special syntax."""
    # Remove frontmatter (YAML between ---)
    content = re.sub(r'^---\s*\n.*?\n---\s*\n', '', content, flags=re.DOTALL | re.MULTILINE)
    
    # Remove HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Remove docusaurus-specific syntax like :::info, :::tip, etc.
    content = re.sub(r':::(\w+)\s*(.*?)\n', r'**\1**: \2\n\n', content)
    content = re.sub(r':::', '', content)
    
    # Process image paths to make them absolute for WeasyPrint
    def replace_image_path(match):
        img_syntax = match.group(0)
        alt_text = match.group(1)
        img_path = match.group(2)
        
        # Skip URLs
        if img_path.startswith('http://') or img_path.startswith('https://'):
            return img_syntax
        
        # Get repo root (two levels up from base_path which is in docs-kits/)
        repo_root = base_path.parent.parent if 'docs-kits' in str(base_path) else base_path.parent
        
        # Handle absolute paths from repo root
        if img_path.startswith('/'):
            full_path = repo_root / img_path.lstrip('/')
        # Handle relative paths
        elif img_path.startswith('../'):
            full_path = (base_path / img_path).resolve()
        else:
            full_path = (base_path / img_path)
        
        # Convert to file:// URL for WeasyPrint
        if full_path.exists():
            file_url = full_path.as_uri()
            return f'![{alt_text}]({file_url})'
        else:
            print(f"Warning: Image not found: {img_path} -> {full_path}")
            return f'![{alt_text}](data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E)'
    
    # Replace image paths in markdown
    content = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_image_path, content)
    
    # Handle mermaid diagrams - mark them for later processing
    def replace_mermaid(match):
        mermaid_code = match.group(1).strip()
        # Use a unique marker that won't be altered by markdown processing
        return f'\n\n[MERMAID_DIAGRAM_START]\n{mermaid_code}\n[MERMAID_DIAGRAM_END]\n\n'
    
    content = re.sub(r'```mermaid\s*(.*?)```', replace_mermaid, content, flags=re.DOTALL)
    
    return content.strip()

def read_markdown_file(file_path, base_path):
    """Read and process markdown file content."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        # Clean and process the content
        return clean_markdown_content(content, base_path)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""

def markdown_to_html(md_content):
    """Convert markdown content to HTML."""
    md = markdown.Markdown(extensions=[
        'extra',
        'codehilite',
        'toc',
        'tables',
        'fenced_code',
        'nl2br'
    ])
    return md.convert(md_content)

def create_pdf_styles():
    """Create CSS styles for the PDF."""
    return """
        @page {
            size: A4;
            margin: 2.5cm 2cm 2cm 2cm;
            
            @bottom-center {
                content: "Page " counter(page) " of " counter(pages);
                font-size: 10pt;
                color: #808080;
            }
        }
        
        .file-section {
            page-break-before: always;
        }
        
        .file-section:first-of-type {
            page-break-before: avoid;
        }
        
        .file-header {
            font-size: 10pt;
            font-weight: bold;
            color: #2c3e50;
            background-color: #f8f9fa;
            padding: 10px 15px;
            margin-bottom: 25px;
            border-left: 4px solid #3498db;
            font-family: 'Courier New', monospace;
        }
        
        .mermaid-diagram {
            background-color: #f8f9fa;
            border: 2px solid #3498db;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            page-break-inside: avoid;
        }
        
        .diagram-title {
            font-weight: bold;
            color: #2c3e50;
            font-size: 12pt;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }
        
        .diagram-code {
            background-color: #ffffff;
            border: 1px solid #ddd;
            padding: 10px;
            font-size: 9pt;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            color: #2c3e50;
        }
        
        body {
            font-family: 'DejaVu Sans', Arial, sans-serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #333;
        }
        
        h1 {
            font-size: 24pt;
            font-weight: bold;
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
            margin-top: 30px;
            margin-bottom: 20px;
            page-break-after: avoid;
        }
        
        h2 {
            font-size: 18pt;
            font-weight: bold;
            color: #34495e;
            border-bottom: 2px solid #95a5a6;
            padding-bottom: 8px;
            margin-top: 25px;
            margin-bottom: 15px;
            page-break-after: avoid;
        }
        
        h3 {
            font-size: 14pt;
            font-weight: bold;
            color: #2c3e50;
            margin-top: 20px;
            margin-bottom: 10px;
            page-break-after: avoid;
        }
        
        h4, h5, h6 {
            font-size: 12pt;
            font-weight: bold;
            color: #34495e;
            margin-top: 15px;
            margin-bottom: 10px;
            page-break-after: avoid;
        }
        
        p {
            margin-bottom: 10px;
            text-align: justify;
        }
        
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 9pt;
        }
        
        pre {
            background-color: #f8f8f8;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 10px;
            overflow-x: auto;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        pre code {
            background-color: transparent;
            padding: 0;
            font-size: 9pt;
        }
        
        blockquote {
            border-left: 4px solid #3498db;
            padding-left: 15px;
            margin-left: 0;
            color: #7f8c8d;
            font-style: italic;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
            page-break-inside: avoid;
        }
        
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        
        th {
            background-color: #3498db;
            color: white;
            font-weight: bold;
        }
        
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        ul, ol {
            margin-bottom: 15px;
            padding-left: 30px;
        }
        
        li {
            margin-bottom: 5px;
        }
        
        a {
            color: #3498db;
            text-decoration: none;
        }
        
        img {
            max-width: 100%;
            height: auto;
            page-break-inside: avoid;
            display: block;
            margin: 15px auto;
        }
        
        figure {
            page-break-inside: avoid;
            text-align: center;
            margin: 20px 0;
        }
        
        figcaption {
            font-style: italic;
            font-size: 9pt;
            color: #7f8c8d;
            margin-top: 5px;
        }
        
        .toc {
            page-break-after: always;
        }
    """

def generate_pdf(source_path, output_path):
    """
    Generate a PDF from markdown files in the specified folder.
    
    Args:
        source_path: Path to the directory containing markdown files
        output_path: Path where the PDF should be saved
    """
    print(f"Starting PDF generation from: {source_path}")
    
    # Collect all markdown files
    md_files = collect_markdown_files(source_path)
    print(f"Found {len(md_files)} markdown files to process")
    
    if not md_files:
        print("Error: No markdown files found!")
        sys.exit(1)
    
    # Combine all markdown content
    combined_html = []
    
    # Add title page
    folder_name = source_path.name
    title_markdown = f"# {folder_name} Documentation\n\n**Eclipse Tractus-X**\n\n*Generated: {datetime.now().strftime('%Y-%m-%d')}*\n\n---\n\n"
    combined_html.append(markdown_to_html(title_markdown))
    
    files_added = 0
    for md_file in md_files:
        print(f"Processing: {md_file.name}")
        content = read_markdown_file(md_file, md_file.parent)
        
        if content and content.strip():
            # Check if content has meaningful text (not just whitespace/markers)
            # Strip HTML tags and check if there's actual content
            stripped_content = re.sub(r'<[^>]+>', '', content)
            stripped_content = re.sub(r'\s+', ' ', stripped_content).strip()
            
            # Only add if there's meaningful content (more than 50 characters of actual text)
            if len(stripped_content) > 50:
                # Convert markdown to HTML first
                html_content_part = markdown_to_html(content)
                
                # Add section separator with file information
                relative_path = md_file.relative_to(source_path)
                
                # Don't add page break for the first file with content
                if files_added == 0:
                    combined_html.append(f'<div class="file-section" style="page-break-before: avoid;">\n')
                else:
                    combined_html.append(f'<div class="file-section">\n')
                    
                combined_html.append(f'<div class="file-header">Source: {relative_path}</div>\n\n')
                combined_html.append(html_content_part)
                combined_html.append("\n</div>\n\n")
                files_added += 1
            else:
                print(f"  Skipping {md_file.name} - insufficient content ({len(stripped_content)} chars)")
        else:
            print(f"  Skipping {md_file.name} - no content")
    
    # Combine all HTML
    html_content = "".join(combined_html)
    
    # Post-process HTML to convert mermaid markers to styled divs with rendered images
    import requests
    import tempfile
    import base64
    from PIL import Image
    
    def replace_mermaid_markers(match):
        mermaid_code = match.group(1).strip()
        
        # The mermaid_code at this point has been converted to HTML by markdown processor
        # We need to extract just the text content
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(mermaid_code, 'html.parser')
        clean_mermaid = soup.get_text().strip()
        
        # Try to render as PNG using mermaid.ink API
        diagram_html = ""
        try:
            # Use mermaid.ink API with base64 encoding
            encoded_mermaid = base64.urlsafe_b64encode(clean_mermaid.encode('utf-8')).decode('utf-8')
            mermaid_url = f"https://mermaid.ink/img/{encoded_mermaid}"
            
            print(f"  Requesting mermaid.ink with {len(clean_mermaid)} chars of code")
            
            # Download the rendered image
            response = requests.get(mermaid_url, timeout=15)
            
            if response.status_code == 200 and 'image' in response.headers.get('Content-Type', ''):
                # Save to temporary file
                with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp_file:
                    tmp_file.write(response.content)
                    png_path = tmp_file.name
                
                # Get image dimensions for proper sizing
                img = Image.open(png_path)
                width, height = img.size
                
                # Scale to fit page (max 500px wide for PDF)
                max_width = 500
                if width > max_width:
                    height = int(height * max_width / width)
                    width = max_width
                
                # Convert image to data URI for embedding
                with open(png_path, 'rb') as img_file:
                    img_data = base64.b64encode(img_file.read()).decode('utf-8')
                
                # Clean up temp file
                Path(png_path).unlink(missing_ok=True)
                
                # Add rendered diagram with source code below
                diagram_html = f'''
<div class="mermaid-diagram">
<div class="diagram-title">📊 Diagram</div>
<div style="text-align: center; margin: 15px 0;">
<img src="data:image/png;base64,{img_data}" style="max-width: 100%; height: auto;" width="{width}" height="{height}" />
</div>
<div style="font-size: 9pt; font-style: italic; color: #666; margin-top: 10px; margin-bottom: 5px;">Source Code:</div>
<pre class="diagram-code">{clean_mermaid}</pre>
</div>
'''
                print(f"  Rendered mermaid diagram from mermaid.ink for PDF")
                return diagram_html
            else:
                print(f"  Warning: mermaid.ink API returned status {response.status_code}")
                
        except Exception as e:
            print(f"  Warning: Could not render mermaid diagram ({e})")
        
        # Fallback: Just show the code
        return f'''
<div class="mermaid-diagram">
<div class="diagram-title">📊 Diagram (Code)</div>
<pre class="diagram-code">{clean_mermaid}</pre>
</div>
'''
    
    html_content = re.sub(
        r'\[MERMAID_DIAGRAM_START\]\s*(.*?)\s*\[MERMAID_DIAGRAM_END\]',
        replace_mermaid_markers,
        html_content,
        flags=re.DOTALL
    )
    
    # Create complete HTML document
    html_doc = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>{folder_name} Documentation</title>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Generate PDF
    print("Generating PDF...")
    font_config = FontConfiguration()
    css = CSS(string=create_pdf_styles(), font_config=font_config)
    
    html = HTML(string=html_doc, base_url=str(source_path))
    html.write_pdf(output_path, stylesheets=[css], font_config=font_config)
    
    print(f"PDF generated successfully: {output_path}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.2f} KB")

def main():
    """Main function."""
    parser = argparse.ArgumentParser(
        description='Generate a PDF from markdown files in a specified folder.',
        epilog='Example: python generate_kit_pdf.py docs-kits/kit-template'
    )
    parser.add_argument(
        'folder',
        nargs='?',
        help='Path to the folder containing markdown files (relative to repo root or absolute path)'
    )
    parser.add_argument(
        'output',
        nargs='?',
        help='Output file path (optional, defaults to <folder-name>.pdf in repo root)'
    )
    
    args = parser.parse_args()
    
    # Get the repository root (assuming script is in scripts/ directory)
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent
    
    # Determine source path
    if args.folder:
        source_path = Path(args.folder)
        # If relative path, make it relative to repo root
        if not source_path.is_absolute():
            source_path = repo_root / source_path
    else:
        # Default to kit-template for backward compatibility
        source_path = repo_root / "docs-kits" / "kit-template"
        print("No folder specified, using default: docs-kits/kit-template")
    
    # Check if source directory exists
    if not source_path.exists():
        print(f"Error: Source directory not found at {source_path}")
        sys.exit(1)
    
    if not source_path.is_dir():
        print(f"Error: {source_path} is not a directory")
        sys.exit(1)
    
    # Determine output path
    if args.output:
        output_path = Path(args.output)
        if not output_path.is_absolute():
            output_path = repo_root / output_path
    else:
        # Generate output filename from folder name
        folder_name = source_path.name.lower().replace(' ', '-')
        output_path = repo_root / f"{folder_name}.pdf"
    
    # Generate the PDF
    try:
        generate_pdf(source_path, output_path)
    except Exception as e:
        print(f"Error generating PDF: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
