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

import React, { useState } from "react";
import Link from "@docusaurus/Link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { successStories } from "@site/utils/successStories";

import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

import styles from "./styles.module.css";

export default function CarouselSuccessStories() {
  let [progress, setProgress] = useState((100 / successStories.length))
  let [slideToShow, setSlideToShow] = useState(1.1)

  const PrevArrow = () => {
    return (
        <ArrowCircleLeftOutlinedIcon sx={{fontSize: '2rem'}} className={styles.btn_slider_left} onClick={() => slider?.current?.slickPrev()}/>
    );
  };

  const NextArrow = () => {
    return (
        <ArrowCircleRightOutlinedIcon sx={{fontSize: '2rem'}}className={styles.btn_slider_right} onClick={() => slider?.current?.slickNext()}/>
    );
  }; 

  let settings = {
    dots: false,
    infinite: false,
    speed: 450,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    afterChange: current => {
      setProgress(100/ (successStories.length - slideToShow + 1) * (current + 1));
    }
  };

  const slider = React.useRef(null);

  const SuccessStoryCard = ({id, img, title, description, pageRoute, buttonName}) => {
    return (
      <div className={styles.slider_item}>
        <div className={styles.slider_img_container}>
          <img src={img} className={styles.slider_img}/>
        </div>
        <div className={styles.slider_info_container}>
          <div className={styles.slider_info_box}>
            <div>
              <h3 className="subtitle-h3">{title}</h3>
            </div>
            <div>
              <p className="description-p">{description}</p>
            </div>
            <Link className="button" to={pageRoute}>
              {buttonName}
            </Link>
          </div>
        </div>
      </div>
    )
  }
    
  return (
    <section className={styles.carousel}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <h2 className="title-h2">Success Stories</h2>
          <div className={styles.subtitle_container}>
            <p className="subtitle-h3">
              Solutions / apps that already used one of the KITs and are sharing their experience with it on how they used the KIT for a use case.
            </p>
          </div>
        </div>

        <div className={styles.slider_container}>
          <Slider ref={slider} {...settings} className={styles.slider}>
            {
              successStories.map((story, index)=> {
                return (
                  <SuccessStoryCard key={index} {...story}/>
                )
              })
            }
          </Slider>

          <div className={styles.progress_bar_container}>
            <div className={styles.progress_bar} style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
