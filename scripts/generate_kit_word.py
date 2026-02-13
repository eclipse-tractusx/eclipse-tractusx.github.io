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
Generate a Word document from markdown files in a specified folder.
This script combines all markdown files from the specified folder
and converts them to a Word (.docx) document.

Usage:
    python generate_kit_word.py <folder_path> [output_file]
    
Examples:
    python generate_kit_word.py docs-kits/kit-template
    python generate_kit_word.py "docs-kits/kits/Business Partner Kit" business-partner-kit.docx
"""

import os
import sys
import argparse
from pathlib import Path
import markdown
from docx import Document
from docx.shared import Pt, Inches, RGBColor
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
from bs4 import BeautifulSoup
import re
import requests
from io import BytesIO
from PIL import Image as PILImage
from datetime import datetime

def collect_markdown_files(base_path):
    """
    Dynamically collect all markdown and MDX files from the directory.
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

def read_markdown_file(file_path):
    """Read markdown file content."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return ""

def setup_document_styles(doc):
    """Set up custom styles for the Word document."""
    
    # Define styles
    styles = doc.styles
    
    # Normal style
    try:
        normal_style = styles['Normal']
        normal_font = normal_style.font
        normal_font.name = 'Calibri'
        normal_font.size = Pt(11)
        normal_font.color.rgb = RGBColor(0, 0, 0)
    except KeyError:
        pass
    
    # Heading 1
    try:
        h1_style = styles['Heading 1']
        h1_font = h1_style.font
        h1_font.name = 'Calibri'
        h1_font.size = Pt(24)
        h1_font.bold = True
        h1_font.color.rgb = RGBColor(44, 62, 80)
    except KeyError:
        pass
    
    # Heading 2
    try:
        h2_style = styles['Heading 2']
        h2_font = h2_style.font
        h2_font.name = 'Calibri'
        h2_font.size = Pt(18)
        h2_font.bold = True
        h2_font.color.rgb = RGBColor(52, 73, 94)
    except KeyError:
        pass
    
    # Heading 3
    try:
        h3_style = styles['Heading 3']
        h3_font = h3_style.font
        h3_font.name = 'Calibri'
        h3_font.size = Pt(14)
        h3_font.bold = True
        h3_font.color.rgb = RGBColor(127, 140, 141)
    except KeyError:
        pass
    
    # Code style
    try:
        code_style = styles.add_style('Code', WD_STYLE_TYPE.PARAGRAPH)
        code_font = code_style.font
        code_font.name = 'Courier New'
        code_font.size = Pt(9)
        code_style.paragraph_format.left_indent = Inches(0.5)
        code_style.paragraph_format.space_before = Pt(6)
        code_style.paragraph_format.space_after = Pt(6)
    except:
        pass

def add_page_number_footer(doc):
    """Add page numbers to the footer."""
    for section in doc.sections:
        footer = section.footer
        footer.is_linked_to_previous = False
        
        # Clear existing footer content
        footer.paragraphs[0].clear()
        
        # Add page number
        paragraph = footer.paragraphs[0]
        paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
        
        # Create run for page number
        run = paragraph.add_run()
        run.font.size = Pt(10)
        run.font.color.rgb = RGBColor(128, 128, 128)
        
        # Add page number field
        fldChar1 = OxmlElement('w:fldChar')
        fldChar1.set(qn('w:fldCharType'), 'begin')
        
        instrText = OxmlElement('w:instrText')
        instrText.set(qn('xml:space'), 'preserve')
        instrText.text = 'PAGE'
        
        fldChar2 = OxmlElement('w:fldChar')
        fldChar2.set(qn('w:fldCharType'), 'end')
        
        run._r.append(fldChar1)
        run._r.append(instrText)
        run._r.append(fldChar2)
        
        # Add "of total pages"
        run.add_text(' of ')
        
        # Add total pages field
        fldChar3 = OxmlElement('w:fldChar')
        fldChar3.set(qn('w:fldCharType'), 'begin')
        
        instrText2 = OxmlElement('w:instrText')
        instrText2.set(qn('xml:space'), 'preserve')
        instrText2.text = 'NUMPAGES'
        
        fldChar4 = OxmlElement('w:fldChar')
        fldChar4.set(qn('w:fldCharType'), 'end')
        
        run._r.append(fldChar3)
        run._r.append(instrText2)
        run._r.append(fldChar4)

def create_new_section_with_header(doc, file_name):
    """Create a new section with a header showing the source file."""
    # Add a section break
    new_section = doc.add_section()
    
    # Configure header
    header = new_section.header
    header.is_linked_to_previous = False
    
    # Clear existing header
    for paragraph in header.paragraphs:
        paragraph.clear()
    
    # Add file name to header
    if len(header.paragraphs) == 0:
        header_para = header.add_paragraph()
    else:
        header_para = header.paragraphs[0]
    
    header_para.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    run = header_para.add_run(f"Source: {file_name}")
    run.font.size = Pt(9)
    run.font.italic = True
    run.font.color.rgb = RGBColor(128, 128, 128)
    
    # Add a line below the header
    header_para2 = header.add_paragraph()
    header_para2.add_run('_' * 100)
    header_para2.runs[0].font.size = Pt(6)
    header_para2.runs[0].font.color.rgb = RGBColor(200, 200, 200)
    
    return new_section

def clean_markdown_content(content):
    """Clean markdown content by removing frontmatter and comments."""
    # Remove frontmatter (YAML between ---)
    content = re.sub(r'^---\s*\n.*?\n---\s*\n', '', content, flags=re.DOTALL | re.MULTILINE)
    
    # Remove HTML comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    
    # Remove docusaurus-specific syntax like :::info, :::tip, etc.
    content = re.sub(r':::(\w+)\s*(.*?)\n', r'**\1**: \2\n', content)
    content = re.sub(r':::', '', content)
    
    # Handle mermaid diagrams - convert to special marker
    def replace_mermaid(match):
        mermaid_code = match.group(1).strip()
        # Use a special marker that will be recognized later
        return f'\n\n**[MERMAID_DIAGRAM_START]**\n```\n{mermaid_code}\n```\n**[MERMAID_DIAGRAM_END]**\n\n'
    
    content = re.sub(r'```mermaid\s*(.*?)```', replace_mermaid, content, flags=re.DOTALL)
    
    return content.strip()

def markdown_to_html(md_content):
    """Convert markdown content to HTML."""
    md = markdown.Markdown(extensions=[
        'extra',
        'tables',
        'fenced_code',
        'nl2br'
    ])
    return md.convert(md_content)

def add_image_to_docx(doc, image_path, base_path, max_width=6.0):
    """Add an image to the Word document."""
    try:
        # Get repo root (two levels up from base_path which is in docs-kits/)
        repo_root = base_path
        while repo_root.parent != repo_root and not (repo_root / 'static').exists():
            repo_root = repo_root.parent
        
        # Resolve image path
        if image_path.startswith('http://') or image_path.startswith('https://'):
            # Download image from URL
            response = requests.get(image_path, timeout=10)
            if response.status_code == 200:
                image_stream = BytesIO(response.content)
            else:
                print(f"Failed to download image: {image_path}")
                return
        else:
            # Handle relative paths
            if image_path.startswith('/'):
                # Absolute path from repo root
                img_file = repo_root / image_path.lstrip('/')
            elif image_path.startswith('../'):
                # Relative path - resolve from the file's directory
                img_file = (base_path / image_path).resolve()
            else:
                # Relative path from base
                img_file = base_path / image_path
            
            if not img_file.exists():
                print(f"Image not found: {img_file}")
                return
            
            image_stream = str(img_file)
        
        # Add image with size constraints
        try:
            # Check if it's an SVG file
            if isinstance(image_stream, str) and image_stream.lower().endswith('.svg'):
                # For SVG files, add a placeholder text instead
                p = doc.add_paragraph(f"[SVG Image: {Path(image_stream).name}]")
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
                p.style.font.italic = True
                p.style.font.size = Pt(10)
                p.style.font.color.rgb = RGBColor(100, 100, 100)
                print(f"Note: SVG image converted to placeholder: {Path(image_stream).name}")
                return
            
            paragraph = doc.add_paragraph()
            run = paragraph.add_run()
            
            # Get image dimensions to maintain aspect ratio
            if isinstance(image_stream, str):
                img = PILImage.open(image_stream)
            else:
                img = PILImage.open(image_stream)
            
            width, height = img.size
            aspect_ratio = height / width
            
            # Calculate display size
            display_width = min(max_width, width / 96)  # Convert pixels to inches (96 DPI)
            display_height = display_width * aspect_ratio
            
            if isinstance(image_stream, str):
                run.add_picture(image_stream, width=Inches(display_width))
            else:
                run.add_picture(image_stream, width=Inches(display_width))
            
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
        except Exception as img_err:
            print(f"Error adding image to document: {img_err}")
    
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")

def process_mermaid_diagram(doc, mermaid_code):
    """Convert mermaid diagram to PNG using Python and add to the document."""
    # Clean the markers from the code
    mermaid_code = re.sub(r'\[MERMAID_DIAGRAM_START\]|\[MERMAID_DIAGRAM_END\]', '', mermaid_code)
    mermaid_code = mermaid_code.strip()
    
    # Try to render as PNG using mermaid.ink API
    import tempfile
    import base64
    
    diagram_rendered = False
    
    try:
        # Use mermaid.ink API with base64 encoding
        encoded_mermaid = base64.urlsafe_b64encode(mermaid_code.encode('utf-8')).decode('utf-8')
        mermaid_url = f"https://mermaid.ink/img/{encoded_mermaid}"
        
        # Download the rendered image
        response = requests.get(mermaid_url, timeout=15)
        
        if response.status_code == 200 and 'image' in response.headers.get('Content-Type', ''):
            # Save to temporary file
            with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as tmp_file:
                tmp_file.write(response.content)
                png_path = tmp_file.name
            
            # Add diagram title
            title_para = doc.add_paragraph()
            title_run = title_para.add_run('📊 Diagram')
            title_run.bold = True
            title_run.font.size = Pt(11)
            title_run.font.color.rgb = RGBColor(44, 62, 80)
            title_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
            title_para.paragraph_format.space_before = Pt(12)
            title_para.paragraph_format.space_after = Pt(6)
            
            # Add the rendered image
            paragraph = doc.add_paragraph()
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
            run = paragraph.add_run()
            
            # Get image dimensions and scale appropriately
            from PIL import Image
            img = Image.open(png_path)
            width, height = img.size
            aspect_ratio = height / width
            
            # Scale to fit page (max 6 inches wide)
            max_width = 6.0
            display_width = min(max_width, width / 96)  # 96 DPI
            
            run.add_picture(png_path, width=Inches(display_width))
            
            # Clean up temp file
            Path(png_path).unlink(missing_ok=True)
            
            print(f"  Rendered mermaid diagram from mermaid.ink")
            diagram_rendered = True
        else:
            print(f"  Warning: mermaid.ink API returned status {response.status_code}")
            
    except Exception as e:
        print(f"  Warning: Could not render mermaid diagram ({e})")
    
    # Always add the source code below the diagram (or standalone if rendering failed)
    if diagram_rendered:
        # Add a subtitle indicating this is the source code
        code_title = doc.add_paragraph()
        code_title_run = code_title.add_run('Source Code:')
        code_title_run.font.size = Pt(9)
        code_title_run.italic = True
        code_title_run.font.color.rgb = RGBColor(100, 100, 100)
        code_title.paragraph_format.space_before = Pt(6)
        code_title.paragraph_format.space_after = Pt(3)
    else:
        # If rendering failed, show a clear title
        title_para = doc.add_paragraph()
        title_run = title_para.add_run('📊 Diagram (Code)')
        title_run.bold = True
        title_run.font.size = Pt(11)
        title_run.font.color.rgb = RGBColor(44, 62, 80)
        title_para.paragraph_format.space_before = Pt(12)
        title_para.paragraph_format.space_after = Pt(6)
    
    # Add diagram code in a shaded box
    code_para = doc.add_paragraph()
    code_para.paragraph_format.left_indent = Inches(0.5)
    code_para.paragraph_format.right_indent = Inches(0.5)
    code_para.paragraph_format.space_after = Pt(12)
    
    code_run = code_para.add_run(mermaid_code)
    code_run.font.name = 'Courier New'
    code_run.font.size = Pt(9)
    code_run.font.color.rgb = RGBColor(44, 62, 80)
    
    # Add shading to the paragraph
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    shading_elm = OxmlElement('w:shd')
    shading_elm.set(qn('w:fill'), 'F8F9FA')
    code_para._p.get_or_add_pPr().append(shading_elm)

def add_html_to_docx(doc, html_content, base_path):
    """Parse HTML and add content to Word document."""
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Track if we're inside a mermaid diagram
    in_mermaid = False
    mermaid_code = []
    
    for element in soup.children:
        if element.name is None:
            continue
        
        # Check for mermaid diagram markers
        element_text = element.get_text().strip()
        
        if '[MERMAID_DIAGRAM_START]' in element_text:
            in_mermaid = True
            mermaid_code = []
            continue
        elif '[MERMAID_DIAGRAM_END]' in element_text:
            if in_mermaid and mermaid_code:
                # Process the collected mermaid code
                full_code = '\n'.join(mermaid_code)
                process_mermaid_diagram(doc, full_code)
            in_mermaid = False
            mermaid_code = []
            continue
        
        # If we're collecting mermaid code
        if in_mermaid:
            if element.name == 'pre':
                code_text = element.get_text().strip()
                mermaid_code.append(code_text)
            continue
            
        # Headings
        if element.name in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            level = int(element.name[1])
            text = element.get_text().strip()
            if text:
                if level == 1:
                    doc.add_page_break()
                doc.add_heading(text, level=min(level, 3))
        
        # Images
        elif element.name == 'img':
            img_src = element.get('src', '')
            img_alt = element.get('alt', '')
            
            if img_src:
                # Add alt text as caption if available
                if img_alt:
                    caption = doc.add_paragraph(img_alt)
                    caption.style.font.italic = True
                    caption.style.font.size = Pt(9)
                    caption.alignment = WD_ALIGN_PARAGRAPH.CENTER
                
                add_image_to_docx(doc, img_src, base_path)
                doc.add_paragraph()  # Add spacing after image
        
        # Paragraphs
        elif element.name == 'p':
            # Check for images within paragraphs
            imgs = element.find_all('img')
            if imgs:
                for img in imgs:
                    img_src = img.get('src', '')
                    img_alt = img.get('alt', '')
                    if img_src:
                        if img_alt:
                            caption = doc.add_paragraph(img_alt)
                            caption.style.font.italic = True
                            caption.style.font.size = Pt(9)
                            caption.alignment = WD_ALIGN_PARAGRAPH.CENTER
                        add_image_to_docx(doc, img_src, base_path)
            else:
                text = element.get_text().strip()
                if text:
                    p = doc.add_paragraph(text)
        
        # Code blocks
        elif element.name == 'pre':
            code_text = element.get_text().strip()
            if code_text:
                try:
                    p = doc.add_paragraph(code_text, style='Code')
                except:
                    p = doc.add_paragraph(code_text)
                    p.style.font.name = 'Courier New'
                    p.style.font.size = Pt(9)
        
        # Blockquotes
        elif element.name == 'blockquote':
            text = element.get_text().strip()
            if text:
                p = doc.add_paragraph(text)
                p.paragraph_format.left_indent = Inches(0.5)
                p.style.font.italic = True
        
        # Lists
        elif element.name in ['ul', 'ol']:
            for li in element.find_all('li', recursive=False):
                text = li.get_text().strip()
                if text:
                    doc.add_paragraph(text, style='List Bullet' if element.name == 'ul' else 'List Number')
        
        # Tables
        elif element.name == 'table':
            rows = element.find_all('tr')
            if rows:
                # Get dimensions
                num_rows = len(rows)
                num_cols = max(len(row.find_all(['th', 'td'])) for row in rows)
                
                if num_cols > 0:
                    # Create table
                    table = doc.add_table(rows=num_rows, cols=num_cols)
                    table.style = 'Light Grid Accent 1'
                    
                    # Fill table
                    for i, row in enumerate(rows):
                        cells = row.find_all(['th', 'td'])
                        for j, cell in enumerate(cells):
                            if j < num_cols:
                                table.rows[i].cells[j].text = cell.get_text().strip()
                                # Bold header cells
                                if cell.name == 'th':
                                    for paragraph in table.rows[i].cells[j].paragraphs:
                                        for run in paragraph.runs:
                                            run.font.bold = True
        
        # Horizontal rules
        elif element.name == 'hr':
            doc.add_paragraph('_' * 80)

def process_markdown_file(doc, file_path, base_path, source_path, is_first_file=False):
    """Process a single markdown file and add to document."""
    print(f"Processing: {file_path.name}")
    
    # Read content
    content = read_markdown_file(file_path)
    if not content:
        return False
    
    # Clean content
    content = clean_markdown_content(content)
    
    # Check if content has meaningful text (not just whitespace)
    stripped_content = re.sub(r'<[^>]+>', '', content)
    stripped_content = re.sub(r'\s+', ' ', stripped_content).strip()
    
    # Skip if insufficient content (less than 50 characters of actual text)
    if len(stripped_content) < 50:
        print(f"  Skipping {file_path.name} - insufficient content ({len(stripped_content)} chars)")
        return False
    
    # Get relative path for header (relative to source_path, not base_path)
    relative_path = file_path.relative_to(source_path)
    
    # Create new section with header for each file (except the first one)
    if not is_first_file:
        create_new_section_with_header(doc, str(relative_path))
    
    # Convert to HTML
    html_content = markdown_to_html(content)
    
    # Add to document - pass the file's parent directory for image resolution
    add_html_to_docx(doc, html_content, file_path.parent)
    
    return True
    
    # Add spacing
    doc.add_paragraph()

def generate_word_doc(source_path, output_path):
    """
    Generate a Word document from markdown files in the specified folder.
    
    Args:
        source_path: Path to the directory containing markdown files
        output_path: Path where the Word document should be saved
    """
    print(f"Starting Word document generation from: {source_path}")
    
    # Create document
    doc = Document()
    
    # Setup styles
    setup_document_styles(doc)
    
    # Add title page
    folder_name = source_path.name
    title = doc.add_heading(f'{folder_name} Documentation', 0)
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    
    doc.add_paragraph()
    subtitle = doc.add_paragraph('Eclipse Tractus-X')
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle.runs[0].font.size = Pt(16)
    
    doc.add_paragraph()
    date_para = doc.add_paragraph(f'Generated: {datetime.now().strftime("%Y-%m-%d")}')
    date_para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    date_para.runs[0].font.size = Pt(12)
    
    doc.add_page_break()
    
    # Collect all markdown files
    md_files = collect_markdown_files(source_path)
    print(f"Found {len(md_files)} markdown files to process")
    
    if not md_files:
        print("Error: No markdown files found!")
        sys.exit(1)
    
    # Process each file
    files_added = 0
    for i, md_file in enumerate(md_files):
        # Pass whether this is the first file that actually gets added
        was_added = process_markdown_file(doc, md_file, md_file.parent, source_path, is_first_file=(files_added == 0))
        if was_added:
            files_added += 1
    
    # Add page numbers to footer
    add_page_number_footer(doc)
    
    # Save document
    print("Saving Word document...")
    doc.save(output_path)
    
    print(f"Word document generated successfully: {output_path}")
    print(f"File size: {os.path.getsize(output_path) / 1024:.2f} KB")

def main():
    """Main function."""
    parser = argparse.ArgumentParser(
        description='Generate a Word document from markdown files in a specified folder.',
        epilog='Example: python generate_kit_word.py docs-kits/kit-template'
    )
    parser.add_argument(
        'folder',
        nargs='?',
        help='Path to the folder containing markdown files (relative to repo root or absolute path)'
    )
    parser.add_argument(
        'output',
        nargs='?',
        help='Output file path (optional, defaults to <folder-name>.docx in repo root)'
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
        output_path = repo_root / f"{folder_name}.docx"
    
    # Generate the Word document
    try:
        generate_word_doc(source_path, output_path)
    except Exception as e:
        print(f"Error generating Word document: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    main()
