import availableColors from './colors';

const getColorTones = () => {
  const selectedColorName = localStorage.getItem('selectedColor');
  const selectedColor = availableColors.find(c => c.color === selectedColorName);

  return {
    main: selectedColor?.main || '#1db954',
    secondary: selectedColor?.secondary || '#1ed760',
    tertiary: selectedColor?.tertiary || '#2E8B57',
  };
};

export default getColorTones;