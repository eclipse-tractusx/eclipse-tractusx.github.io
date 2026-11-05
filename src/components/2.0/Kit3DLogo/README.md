# Kit3DLogo Component

A reusable React component that displays a 3D isometric stacked logo for Eclipse Tractus-X kits.

## Features

- 🎨 **Dynamic Colors**: Automatically extracts and applies colors from `kitsData.js`
- 📐 **8-Layer Stack**: Creates an isometric 3D effect with 4 content layers and 4 border layers
- 🔄 **Opacity Progression**: Implements 40% → 60% → 80% → 100% opacity for visual depth
- 📏 **Dynamic Logo Sizing**: Automatically calculates optimal logo size based on kit metadata
- ♻️ **Fully Reusable**: Simple prop-based interface for displaying any kit logo

## Usage

### Basic Example

```jsx
import Kit3DLogo from '@site/src/components/Kit3DLogo';

function MyComponent() {
  return <Kit3DLogo kitId="connector" />;
}
```

### With Custom Class

```jsx
<Kit3DLogo kitId="digital-twin" className="custom-container" />
```

### With Download Button

```jsx
<Kit3DLogo kitId="connector" showDownload={true} />
```

### Display Multiple Kits

```jsx
import Kit3DLogo from '@site/src/components/Kit3DLogo';

function KitsGallery() {
  const kitIds = ['connector', 'digital-twin', 'traceability', 'pcf'];
  
  return (
    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
      {kitIds.map(kitId => (
        <Kit3DLogo key={kitId} kitId={kitId} />
      ))}
    </div>
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `kitId` | `string` | Yes | - | The unique identifier of the kit from `kitsData.js` (e.g., "connector", "digital-twin") |
| `className` | `string` | No | `''` | Additional CSS class to apply to the container |
| `showDownload` | `boolean` | No | `false` | Show a download button to save the logo as PNG image |

## Valid Kit IDs

The component supports all kit IDs defined in `kitsData.js`, including:

**Dataspace Foundation:**
- `connector`
- `data-governance`
- `data-trust-security`
- `business-partner`

**Industry Core Foundation:**
- `digital-twin`
- `industry-core`
- `data-chain`
- `traceability`
- `supply-chain-disruption`
- `agents`

**Use Cases:**
- `ess`
- `pcf`
- `eco-pass`
- `circularity`
- `dcm`
- `logistics`
- `customs`
- `osim`
- `puris`
- `model-based-production`
- `behavior-twin`
- `data-driven-quality`
- `requirements`
- `geometry`

**Industry-Specific:**
- `maas`
- `modular-production`

## Technical Details

### Layer Structure

The component creates 8 layers in the following order (bottom to top):

1. **Layer 5** - Border only, 40% opacity
2. **Layer 4** - Content with gradient, 40% opacity
3. **Layer 4b** - Border only, 40% opacity
4. **Layer 3** - Content with gradient, 60% opacity
5. **Layer 3b** - Border only, 60% opacity
6. **Layer 2** - Content with gradient, 80% opacity
7. **Layer 2b** - Border only, 80% opacity
8. **Layer 1** - Content with gradient + logo, 100% opacity

### 3D Transform

- **Rotation X**: 55 degrees (isometric angle)
- **Rotation Z**: 45 degrees (rotation direction)
- **Layer Spacing**: 14.5px increments between layers
- **Gradient Direction**: 45 degrees (bottom-left to top-right)

### Color Processing

The component automatically:
1. Extracts base colors from the kit's gradient definition
2. Creates darkened variations for lower layers (75%, 55%, 40%)
3. Applies border colors from the primary gradient color
4. Matches opacity to each layer pair

### Logo Sizing

Logo size is dynamically calculated based on the kit's `logoWidth` and `logoHeight` properties:

```javascript
const avgSize = (logoWidth + logoHeight) / 2;
const logoSizePercent = (avgSize / 80) * 45;
```

This ensures consistent visual appearance across kits with different logo dimensions.

## Styling

The component uses SCSS modules for styling. To customize the appearance:

1. **Container Size**: Modify `.logo3dContainer` dimensions in `Kit3DLogo.module.scss`
2. **Layer Size**: Adjust `.logo3dLayer` width/height
3. **Border Radius**: Change the `border-radius` value
4. **Spacing**: Update `translateZ` values in layer classes

### Example Customization

```scss
// In your custom SCSS file
.customContainer :global(.logo3dContainer) {
  width: 400px;
  height: 420px;
}
```

## Error Handling

The component includes built-in error handling:

- Returns `null` if the kit ID is not found
- Logs error to console for debugging
- Validates gradient format before rendering

## Dependencies

- React 16.8+ (uses hooks: `useMemo`)
- `@site/data/kitsData` - Kit metadata
- SCSS support in the build system

## Browser Compatibility

The component uses CSS 3D transforms and requires:
- Modern browsers with CSS3 support
- No IE11 support (uses CSS transforms and CSS modules)

## Performance

- Uses `useMemo` to cache color calculations and kit lookups
- Minimal re-renders (only on `kitId` prop change)
- No external API calls - all data is from static imports
