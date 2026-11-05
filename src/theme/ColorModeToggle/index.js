// import React from 'react';
// import ColorModeToggle from '@theme-original/ColorModeToggle';

// export default function ColorModeToggleWrapper(props) {
//   return (
//     <>
//       <ColorModeToggle {...props} />
//     </>
//   );
// }

import { useColorScheme } from '@mui/material';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import React, { useEffect } from 'react';

export default function ColorModeToggleWrapper(props) {
  // Get the MUI hook
  const { setMode } = useColorScheme();

  // Extract the docusaurus theme from the component properties
  const { value } = props;

  // Whenever the theme changes in docusaurus, trigger the change in MUI
  useEffect(() => {
    setMode(value);
  }, [value]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
