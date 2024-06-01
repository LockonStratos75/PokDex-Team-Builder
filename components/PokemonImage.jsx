import React, {useState, useCallback} from 'react';
import FastImage from 'react-native-fast-image';

const PokemonImage = ({primaryUri, fallbackUri, style}) => {
  const [imageUri, setImageUri] = useState(primaryUri);

  const handleImageError = useCallback(() => {
    setImageUri(fallbackUri);
  }, [fallbackUri]);

  return (
    <FastImage
      style={style}
      source={{uri: imageUri}}
      resizeMode={FastImage.resizeMode.contain}
      onError={handleImageError}
    />
  );
};

export default React.memo(PokemonImage);
