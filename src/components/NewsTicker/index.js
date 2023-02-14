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
import Link from "@docusaurus/Link";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./styles.module.css";

export default function NewsTicker() {
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 6000,
  };

  const news = [
    {
      date: "10.02.2023",
      title: "Eclipse Tractus-X Developer Portal is LIVE!",
      blogLink: "/blog/portal-is-live"
    },
    {
      date: "00.00.0000",
      title: "TESTING SECOND ITEM",
      blogLink: "/blog/portal-is-live"
    },
    {
      date: "01.001.00001",
      title: "TESTING THE THIRD ITEM",
      blogLink: "/blog/portal-is-live"
    },
  ]

  const NewsCard = ({date, title, blogLink}) => {
    return (
      <div className={styles.slider_item}>
        <div className={styles.date}>
          {date}
        </div>

        <div className={styles.introduction}>
          <strong>{title}</strong>
        </div>

        <div className={styles.link_to_blog}>
          <Link to={blogLink}>
            Read more &gt;
          </Link>
        </div>
      </div>
    )
  }


  return (
    <section className={styles.news_ticker}>
      <div className={styles.container}>
        <div className={styles.button_container}>
          <Link className={styles.button} to="/blog">
            News
          </Link>
        </div>

        <div className={styles.carousel_container}>
          <Slider {...settings} className={styles.slider}>
            {
              news.map((newPost, index)=> {
                return (
                  <NewsCard key={index} {...newPost}/>
                )
              })
            }
          </Slider>
        </div>
        
      </div>
    </section>
  );
}