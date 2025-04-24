import codeIcon from "@site/static/img/code-icon.png";
import contributeIcon from "@site/static/img/contribute-icon.png"
import faqIcon from "@site/static/img/faq.png";
import communityIcon from "@site/static/img/community.png"

export const carouselCommunityInfo = [
    {
        id: 0,
        title: "Community.",
        subtitle: "Contribute.",
        description: "Get familiar with the guidelines and governance that you’ll need to contribute to this project",
        textCard: true
    },
    {
        id: 1,
        title: "DevHub",
        navigate: "/docs/developer",
        icon: codeIcon
    },
    {
        id: 2,
        title: "Community",
        navigate: "/community/intro",
        icon: communityIcon
    },
    {
        id: 3,
        title: "Contribute a KIT",
        navigate: "/Developer",
        icon: contributeIcon
    },
    {
        id: 4,
        title: "FAQ",
        navigate: "/docs/dev_faq",
        icon: faqIcon
    }
  ]
