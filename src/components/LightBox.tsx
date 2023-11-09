import Lightbox from "react-native-lightbox-v2";
import { Image } from "@gluestack-ui/themed";

type LightBoxProps = {
  image: any;
  children: any;
  width?: number;
  height?: number;
};

const LightBoxC = ({ image, children, width, height }: LightBoxProps) => {
  return (
    <Lightbox>
      <Image
        source={{ uri: image }}
        alt="image"
        width={width}
        height={height}
      />
    </Lightbox>
  );
};

export default LightBoxC;
