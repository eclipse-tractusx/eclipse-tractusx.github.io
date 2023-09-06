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
import { carouselRoleBased } from "../../../utils/carouselRoleBased";
import styles from "./styles.module.css";
import { useMediaQuery, Box } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export default function RoleBasedEnrtyComponent() {
    const isWeb = useMediaQuery('(min-width:1024px)');
    const isMobile = useMediaQuery('(max-width:600px)');
    let settings = {
        dots: false,
        slidesToShow: isWeb ? 2 : 1,
        slidesToScroll: isWeb ? 2 : 1,
        autoplay: false,
        infinite: false,
        variableWidth: true,
        arrows: true,
        nextArrow: <Box sx={{
            display: 'flex !important',
            color: '#fff',
            right: '20px',
            boxShadow: '0px 4px 100px 30px rgb(255 255 255)',
            backgroundColor: 'rgb(255 255 255 / 35%)',
            borderRadius: '100px'
        }}></Box>,
        prevArrow: <Box sx={{
            display: 'flex !important',
            color: '#fff',
            left: '20px',
            zIndex: '999'
        }}></Box>,
        initialSlide: 0,
    };

    const RoleBasedEntryCard = ({ title, description }) => {
        return (
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
        )
    }

    return (
        <section className={styles.roles_based_entry}>
            <Slider {...settings} className={styles.slider}>
                {!isMobile && (
                    <div className={styles.text_card_container}></div>
                )}
                {
                    carouselRoleBased.map((newPost, index) => {
                        return (
                            <RoleBasedEntryCard key={index} {...newPost} />
                        )
                    })
                }
            </Slider>
        </section>
    );
}
