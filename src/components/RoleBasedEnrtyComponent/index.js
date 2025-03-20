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
import styles from "./styles.module.css";
import { useMediaQuery, Box } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import sliderRightArrowImage from '@site/static/img/slider_right_icon.png'
import sliderLeftArrowImage from '@site/static/img/slider_left_icon.png';
import Link from "@docusaurus/Link";

export default function RoleBasedEnrtyComponent({data, showArrow = true}) {
    const isWeb = useMediaQuery('(min-width:1024px)');
    const isMobile = useMediaQuery('(max-width:600px)');
    function  NextArrow (props) {
        const { onClick } = props;
        return (
            <Box className={styles.next_arrow} onClick={onClick}><img src={sliderRightArrowImage} width={'30px'} height={'auto'} alt={'img'} /></Box>
        )
    }
    function  PrevArrow (props) {
        const { onClick } = props;
        return (
            <Box className={styles.prev_arrow} onClick={onClick}><img src={sliderLeftArrowImage} width={'30px'} height={'auto'} alt={'img'} /></Box>
        )
    }
    let settings = {
        dots: false,
        slidesToShow: isWeb ? 2 : 1,
        slidesToScroll: isWeb ? 2 : 1,
        autoplay: false,
        infinite: false,
        variableWidth: true,
        arrows: showArrow,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        initialSlide: 0,
    };

    const RoleBasedEntryCard = ({ title, description, navigate }) => {
        return (
            <Link className={styles.link_container} to={navigate}>
                <div className={styles.card_container}>
                    <div>
                        <Typography className={styles.roles_title}
                            sx={{
                                fontFamily: 'Manrope, sans-serif'
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography className={styles.roles_description}
                            sx={{
                                fontFamily: 'Manrope, sans-serif',
                            }}
                        >
                            {description}
                        </Typography>
                    </div>
                    <div className={styles.icon_container}>
                        <div className={styles.empty_container}></div>
                        <div className={styles.empty_container}></div>
                        <div className={styles.arrow_icon}>
                            <ArrowCircleRightIcon />
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <section className={styles.roles_based_entry}>
            {data && (
            <Slider {...settings} className={styles.slider}>
                {!isMobile && (
                    <div className={styles.text_card_container}></div>
                )}
                {
                    data?.map((newPost, index) => {
                        return (
                            <RoleBasedEntryCard key={index} {...newPost} />
                        )
                    })
                }
            </Slider>
            )}
        </section>
    );
}
