import React from "react";
import Link from "@docusaurus/Link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Business_Kit from "@site/static/img/business_kit.png";
import Conector_Kit from "@site/static/img/conector_kit.png";
import DataChain_Kit from "@site/static/img/datachain_kit.png";

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import styles from "./styles.module.css";

// function Arrow(props) {
//       let className = props.type === "next" ? "nextArrow" : "prevArrow";
//       className += " arrow";
//       const char = props.type === "next" ? "siguiente" : "previa";
//       return (
//         <span className={className} onClick={props.onClick}>
//           {char}
//         </span>
//       );
//     }

export default function CarouselComponent() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      // nextArrow: <Arrow type='next'/>,
      // prevArrow: <Arrow type='prev'/>
      nextArrow: <ArrowCircleRightOutlinedIcon sx={{color: '#FAA023', fontSize: '2vw', '&:hover': {color: '#fff'}}}/>,
      prevArrow: <ArrowCircleLeftOutlinedIcon sx={{color: '#faa023', fontSize: '2vw', '&:hover': {color: '#fff'}}}/>
    };

    const kits = [
      {
        id: 1,
        img: Business_Kit
      },
      {
        id: 2,
        img: Conector_Kit
      },
      {
        id: 3,
        img: DataChain_Kit
      },
      {
        id: 4,
        img: Conector_Kit
      },
      {
        id: 5,
        img: DataChain_Kit
      },
    ]

    return (
    <section className={styles.carousel}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2 className={styles.title}>The Kits</h2>
          <p className={styles.subtitle}>
          Kits aim to accelerate the adoption, development, and operations of the next generation Business <br/>Applications and Services. This is an overview of the existing Kits.
          </p>
        </div>
        

        <div className={styles.carousel_box}>
        <div className={styles.btn_container}>
            <Link className={styles.button} /* to="/aboutus" */>
              All cx-kits
            </Link>
        </div>
          <Slider {...settings} className={styles.slider}>
            {
              kits.map((kit)=> {
                return (
                  <div key={kit.id} className={styles.carousel_item}>
                    <Link className={styles.carousel_content} to='docs/kits'>
                    <img src={kit.img} className={styles.carousel_img}/>
                    </Link>
                  </div>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </section>
  );
}

