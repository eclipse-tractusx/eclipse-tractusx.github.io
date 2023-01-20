import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

import Business_Kit from "@site/static/img/gallery-business_kit-minified.png";
import Conector_Kit from "@site/static/img/gallery-more_coming-minified.png";
import DataChain_Kit from "@site/static/img/gallery-datachain_kit-minified.png";


export default function KitsGallery() {
  const kits = [
    {
      id: 1,
      img: Business_Kit,
      pageRoute: "docs/kits/Business Partner Kit/Adoption View"
    },
    {
      id: 2,
      img: DataChain_Kit,
      pageRoute: "datachainkit/adoptionview"
    },
    {
      id: 3,
      img: Conector_Kit
    },
  ]

  return (
    <section className={styles.kits_gallery}>
      <div className={styles.container}>

        <div className={styles.title_container}>
          <h2 className={styles.title}>Our Kits</h2>
          <p className={styles.description}>
          Unlock the power of kits. Browse the latest kits, their documentation, <br/>
          including tutorials,sample code, articles, and API reference.
          </p>
        </div>

        <div className={styles.gallery_container}>
          {
            kits.map((kit)=> {
              return(
                <div className={styles.gallery_item}>
                  <Link to={kit.pageRoute} className={styles.gallery_link}>
                    <img src={kit.img} className={styles.item_img}/>
                  </Link>
                </div>
              )      
            })
          }
        </div>
      </div>
    </section>
  );
}

