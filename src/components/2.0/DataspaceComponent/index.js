/********************************************************************************* 
 * Copyright (c) 2025 Contributors to the Eclipse Foundation
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
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { industries } from "@site/data/kitsData";
import styles from "./styles.module.scss";
import { useMediaQuery, Box } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import sliderWhiteRightArrowImage from '@site/static/img/slider_white_right_icon.png';
import sliderWhiteLeftArrowImage from '@site/static/img/slider_white_left_icon.png';
import Link from "@docusaurus/Link";

export default function DataspaceComponent() {
  const isWeb = useMediaQuery('(min-width:1023px)');
  const isMobile = useMediaQuery('(max-width:1199px)');
  
  // Extract all dataspaces from industries
  const allDataspaces = industries.flatMap(industry => 
    (industry.dataspaces || []).map(dataspace => ({
      ...dataspace,
      industry: industry.name,
      kitCount: dataspace.kits ? dataspace.kits.length : 0
    }))
  );

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <Box className={styles.next_arrow} onClick={onClick}>
        <img src={sliderWhiteRightArrowImage} width={'30px'} height={'auto'} alt={'next'} />
      </Box>
    );
  }

  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <Box className={styles.prev_arrow} onClick={onClick}>
        <img src={sliderWhiteLeftArrowImage} width={'30px'} height={'auto'} alt={'prev'} />
      </Box>
    );
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

  const DataspaceCard = ({ name, url, logo, subtitle, kitCount, gradient, colors, textCard, title, description }) => {
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
          <div className={styles.container}>
            <div className={styles.card_wrapper}>
              <Link className={styles.link_container} to={`/Kits/dataspace?name=${encodeURIComponent(name)}&ref=dataspaces`}>
                <div 
                  className={styles.card_container}
                  style={{
                    '--layer1-color': colors?.layer1 || 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <img 
                    className={styles.img} 
                    src={logo.src} 
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                  />
                </div>
              </Link>
              <div className={styles.card_layers}>
                <div className={styles.layer_1} style={{ backgroundColor: colors?.layer1 || 'rgba(255, 255, 255, 0.1)' }}></div>
                <div className={styles.layer_2} style={{ backgroundColor: colors?.layer2 || 'rgba(255, 255, 255, 0.08)' }}></div>
                <div className={styles.layer_3} style={{ backgroundColor: colors?.layer3 || 'rgba(255, 255, 255, 0.06)' }}></div>
                <div className={styles.layer_4} style={{ backgroundColor: colors?.layer4 || 'rgba(255, 255, 255, 0.04)' }}></div>
              </div>
            </div>
            <div className={styles.card_info_container}>
              <div className={styles.card_title_container}>
                <Typography className={styles.card_title}
                  sx={{
                    fontFamily: 'Manrope, sans-serif'
                  }}
                >
                  {name}
                </Typography>
              </div>
              <Typography className={styles.card_kit_count}
                sx={{
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                {kitCount} {kitCount === 1 ? 'KIT' : 'KITs'}
              </Typography>
              <Button
                className={styles.external_link_button}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size={isMobile ? "medium" : "small"}
                endIcon={<LaunchIcon />}
                sx={{
                  marginLeft: isMobile ? '0' : '30px',
                  marginTop: '8px',
                  textTransform: 'none',
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: isMobile ? '14px' : '12px',
                  borderColor: 'var(--ifm-color-emphasis-300)',
                  color: 'var(--ifm-heading-color)',
                  '&:hover': {
                    borderColor: 'var(--ifm-color-emphasis-500)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }
                }}
              >
                Visit Website
              </Button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <section className={styles.dataspace_info}>
      <Grid container spacing={0} className={styles.content_wrapper}>
        <Grid item xs={12} lg={4}>
          <div className={styles.textcard_container}>
            <div>
              <Typography className={styles.text_card_toptitle}
                sx={{
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                ECLIPSE TRACTUS-X
              </Typography>
              <Typography className={styles.text_card_title}
                sx={{
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                Dataspaces
              </Typography>
              <Typography className={styles.text_card_subtitle}
                sx={{
                  fontFamily: 'Manrope, sans-serif'
                }}
              >
                Network
              </Typography>
              <Typography className={styles.text_card_description}
                sx={{
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                Explore the different dataspaces in our network. Inspect their custom built stacks powered by one or more Eclipse Tractus-X KITs and Open Source Products!
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} lg={8}>
          <div className={styles.slider_wrapper}>
            {isMobile ? (
              <div className={styles.mobile_cards_container}>
                {allDataspaces.map((item, index) => (
                  <DataspaceCard key={index} {...item} />
                ))}
              </div>
            ) : (
              <Slider {...settings} className={styles.slider}>
                {allDataspaces.map((item, index) => {
                  return (
                    <DataspaceCard key={index} {...item} />
                  );
                })}
              </Slider>
            )}
          </div>
        </Grid>
      </Grid>
    </section>
  );
}
