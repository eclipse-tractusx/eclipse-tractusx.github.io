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
 
 import { carouselKits } from "@site/utils/carouselKits";
 
 import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
 import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
 
 import styles from "./styles.module.css";
 
 export default function CarouselComponent() {
     let settings = {
       dots: true,
       infinite: true,
       speed: 500,
       slidesToShow: 3,
       slidesToScroll: 1,
       arrows: false,
     };
 
     const slider = React.useRef(null);
 
     return (
     <section className={styles.carousel}>
       <div className={styles.container}>
         <div className={styles.title_container}>
           <h2 className={styles.title}>The Kits</h2>
           <p className={styles.subtitle}>
           Kits aim to accelerate the adoption, development, and operations of the next generation Business <br/>Applications and Services. This is an overview of the existing Kits.
           </p>
         </div>
         
         <div className={styles.btn_container}>
           <Link className={styles.button} /* to="/aboutus" */>
             All CX-Kits
           </Link>
           <div className={styles.btn_slider_container}>
             <ArrowCircleLeftOutlinedIcon sx={{fontSize: '2.3vw', '@media (max-width: 996px)': {fontSize: '3.5vw'}}} className={styles.btn_slider} onClick={() => slider?.current?.slickPrev()}/>
             <ArrowCircleRightOutlinedIcon sx={{fontSize: '2.3vw',  '@media (max-width: 996px)': {fontSize: '3.5vw'}}} className={styles.btn_slider} onClick={() => slider?.current?.slickNext()}/>
           </div>
         </div>
 
         <div className={styles.slider_container}>
           <Slider ref={slider} {...settings} className={styles.slider}>
             {
               carouselKits.map((kit)=> {
                 return (
                   <div key={kit.id} className={styles.slider_item}>
                     <Link className={styles.slider_content} to={kit.pageRoute}>
                     <img src={kit.img} className={styles.slider_img}/>
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
 