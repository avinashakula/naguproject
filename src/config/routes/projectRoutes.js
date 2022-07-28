const BASE_URL = "/";

const ProjectRoutes = {
    base: {url: BASE_URL},
    home: {
        url: BASE_URL + "home",
    },
    games: {
        url: BASE_URL + "play",
    },
    shop: {
        url: BASE_URL + "store",
    },
    challenges: {
        url: BASE_URL + "challenges"
    },
    leaderboard: {
        url: BASE_URL + "leaderboard"
    },
    menu: {
        url: BASE_URL + "menu"
    },
    ffDemo: {
        url: BASE_URL + "ff-demo"
    },
    ffDemoOne: {
        url: BASE_URL + "ff-demo1"
    },
};

export default ProjectRoutes;
export {BASE_URL};