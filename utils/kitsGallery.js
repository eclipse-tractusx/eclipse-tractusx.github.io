import Business_Kit from "@site/static/img/bpkit.png";
import DataChain_Kit from "@site/static/img/datachainkit.png";
import Connector_Kit from "@site/static/img/connectorkit-min.png";
import Traceability_Kit from "@site/static/img/traceabilitykit.png";
import OSim_Kit from "@site/static/img/OSimKIT_card-min.png";

// import MoreToCome from "@site/static/img/gallery-more_coming-minified.png";

//************************** IMPORTANT **************************** */

// WHEN DEFINING A "DOMAIN" IN THE kitsGallery ARRAY, MAKE SURE TO SELECT/TYPE EXACTLY AS BELOW:
// * Network & Core Services
// * PLM / Quality
// * Sustainability
// * Resiliency

//**************************************************************** */

export const kitsGallery = [
  {
    id: 1,
    name: 'Business Partner Kit',
    domain: 'Network & Core Services',
    img: Business_Kit,
    pageRoute: "docs-kits/kits/Business Partner Kit/Adoption View"
  },
  {
    id: 2,
    name: 'Data Chain Kit',
    domain: 'Network & Core Services',
    img: DataChain_Kit,
    pageRoute: "docs-kits/kits/Data Chain Kit/Adoption View"
  },
  {
    id: 3,
    name: 'Connector Kit',
    domain: 'Network & Core Services',
    img: Connector_Kit,
    pageRoute: "docs-kits/kits/tractusx-edc/docs/kit/adoption-view/Adoption%20View"
  },
  {
    id: 4,
    name: 'Traceability Kit',
    domain: 'PLM / Quality',
    img: Traceability_Kit,
    pageRoute: "docs-kits/kits/Traceability%20Kit/Adoption%20View%20Traceability%20Kit"
  },
  {
    id: 5,
    name: 'OSim Kit',
    domain: 'Resiliency',
    img: OSim_Kit,
    pageRoute: "docs-kits/next/kits/OSim%20Kit/Adoption%20View%20OSim%20Kit"
  },
  // {
  //   id: 4,
  //   img: MoreToCome
  // },
]
