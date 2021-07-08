import styled from "@emotion/styled";
import qiSiCat from "../assets/qisicat.svg";
import catEatFish from "../assets/cateatfish.svg";
// import left from "../assets/left.svg";
// import right from "../assets/right.svg";

export const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${qiSiCat}), url(${catEatFish});
`;
