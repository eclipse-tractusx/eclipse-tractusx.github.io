/********************************************************************************* 
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG 
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 * 
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from '@mui/material/Typography';
import { carouselCommunityInfo } from "../../../utils/carouselCommunityInfo";
import styles from "./styles.module.css";
import { useMediaQuery, Box } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import sliderWhiteRightArrowImage from '@site/static/img/slider_white_right_icon.png';
import sliderWhiteLeftArrowImage from '@site/static/img/slider_white_left_icon.png';
import Link from "@docusaurus/Link";

export default function CommunityComponent() {
  const isWeb = useMediaQuery('(min-width:1023px)');
  function  NextArrow (props) {
    const { onClick } = props;
    return (
        <Box className={styles.next_arrow} onClick={onClick}><img src={sliderWhiteRightArrowImage} width={'30px'} height={'auto'} alt={'img'} /></Box>
    )
}
function  PrevArrow (props) {
    const { onClick } = props;
    return (
        <Box  className={styles.prev_arrow} onClick={onClick}><img src={sliderWhiteLeftArrowImage} width={'30px'} height={'auto'} alt={'img'} /></Box>
    )
}
  let settings = {
    dots: false,
    slidesToShow: isWeb ? 2 : 1,
    slidesToScroll: isWeb ? 2 : 1,
    autoplay: false,
    infinite: false,
    variableWidth: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
  };

  const CompanyCard = ({ title, subtitle, description, icon, textCard, navigate }) => {
    return (
      <>
        {textCard ? (
          <div className={styles.text_card_container}>
            <div>
              <Typography className={styles.text_card_title}
                sx={{
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                {title}
              </Typography>
              <Typography className={styles.text_card_subtitle}
                sx={{
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                {subtitle}
              </Typography>
              <Typography className={styles.text_card_description}
                sx={{
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {description}
              </Typography>
            </div>
          </div>
        ) : (
          <Link className={styles.link_container} to={navigate}>
            <div className={styles.container}>
              <div className={styles.card_container}>
                <img className={styles.img} src={icon} />
              </div>
                <div className={styles.card_title_container}>
                  <Typography className={styles.card_title}
                    sx={{
                      fontFamily: 'Manrope, sans-serif'
                    }}
                  >
                    {title}
                  </Typography>
                  <LaunchIcon className={styles.launch} />
                </div>
            </div>
          </Link>
        )}
      </>
    )
  }

  return (
    <section className={styles.conmmunity_info}>
      <Slider {...settings} className={styles.slider}>
        {
          carouselCommunityInfo.map((newPost, index) => {
            return (
              <CompanyCard key={index} {...newPost} />
            )
          })
        }
      </Slider>
    </section>
  );
}
