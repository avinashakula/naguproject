import React from 'react';
import {Redirect} from "react-router-dom";
import ErrorContainer from "../../commons/components/errorContainer";
import {ChallengesContainer} from "../../redux/modules/screens/challenges";
import { FactsContainer } from '../../redux/modules/screens/facts';
import { FactsTwoContainer } from '../../redux/modules/screens/factsTwo';
import {GamesContainer} from "../../redux/modules/screens/games";
import {SkillZoneContainer} from "../../redux/modules/screens/home";
import {LeaderboardContainer} from "../../redux/modules/screens/leaderboard";
import {MenuContainer} from "../../redux/modules/screens/menu";
import {ShopContainer} from "../../redux/modules/screens/shop";
import HelperFunctions from "../../utils/HelperFunctions";
import ProjectRoutes from "./projectRoutes";

const routes = [
    {
        path: ProjectRoutes.base.url,
        exact: true,
        render: () => (
            <Redirect to={ProjectRoutes.home.url + HelperFunctions.getQueryStringFromURL()}/>
        )
    },
    {
        path: ProjectRoutes.home.url,
        component: SkillZoneContainer,
        exact: true
    },
    {
        path: ProjectRoutes.games.url,
        component: GamesContainer,
        exact: true
    },
    {
        path: ProjectRoutes.shop.url,
        component: ShopContainer,
        exact: true
    },
    {
        path: ProjectRoutes.leaderboard.url,
        component: LeaderboardContainer,
        exact: true
    },
    {
        path: ProjectRoutes.challenges.url,
        component: ChallengesContainer,
        exact: true
    },
    {
        path: ProjectRoutes.menu.url,
        component: MenuContainer,
        exact: true
    },
    // {
    //     path: ProjectRoutes.ffDemo.url,
    //     component: FactsContainer,
    //     exact: true
    // },
    // {
    //     path: ProjectRoutes.ffDemoOne.url,
    //     component: FactsTwoContainer,
    //     exact: true
    // },
    {
        component: ErrorContainer
    }
];

export default routes;