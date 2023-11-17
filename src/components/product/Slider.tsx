import Swiper from "react-native-swiper";
import { Image } from "@gluestack-ui/themed";
import { colors } from "../../constants";

const Slider = () => {
  const banners = [
    {
      id: 1,
      image: require("../../../assets/images/banner.png"),
    },
    {
      id: 2,
      image: require("../../../assets/images/banner.png"),
    },
    {
      id: 3,
      image: require("../../../assets/images/banner.png"),
    },
  ];

  return (
    <Swiper
      autoplay
      autoplayTimeout={3}
      showsPagination={true}
      showsButtons={false}
      loop={true}
      style={{ height: 200 }}
      dotColor={colors.grey}
      activeDotColor={colors.secondary}
    >
      {banners.map((item) => (
        <Image
          key={item.id}
          source={item.image}
          resizeMode="contain"
          style={{ width: "100%", height: 200 }}
          alt="banner"
        />
      ))}
    </Swiper>
  );
};

export default Slider;
