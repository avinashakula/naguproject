import * as ActionTypes from "./actionTypes";

const initialState = {
    faq: { data: null, loader: true },
    pageContent: {
        data: {
            "page_id": 9,
            "game_id": 1,
            "page_name": "Terms \u0026 Conditions",
            "page_heading": "Terms \u0026 Conditions",
            "page_url": "terms-and-conditions",
            "page_des": `<div class="c-card-outer">
                                <div class="condition-content">
                                  <h2>Who can take part?</h2>
                                  <p>The game is available for new and existing customers with registered accounts, aged 18 or over.</p>
                                  <h2>How and when can I play?</h2>
                                  <p>Hit the Spot is a free to play game. A new Weekly Leaderboard contest will run every week. Each player can take part in up to 10 rounds of kicks per day. Each round (also known as a ‘life’) consists of 10 shots. Each contest runs from the first day of each calendar week (Monday) until the final day of the calendar week (Sunday), with the game open between 06:00 till 00:00 every day, as indicated by the countdown timer on the home screen.</p>
                                  <p>Points are calculated by scoring goals and hitting targets as follows. Bonus points can be given to users who use Boosts on individual kicks (such as using a Gold Fireball and receiving quadruple points on the next kick):</p>
                                  <div class="table-content">
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <thead>
                                          <tr>
                                              <th>1 point</th>
                                              <th>2 points</th>
                                              <th>3 points</th>
                                              <th>5 points</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          <tr>
                                              <td>Goal</td>
                                              <td>+2 Target<br></td>
                                              <td>+3 Target</td>
                                              <td>+5 Target</td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  <h2>What can I win?</h2>
                                  <p>Each week, the prize pool of €2500 in cash will be distributed to players based on their finishing position on the Ranking Points Weekly Leaderboard:</p>   
                                  <div class="table-content">
                                      <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                          <thead>
                                          <tr>
                                              <th>Position</th>
                                              <th>Prize</th>
                                          </tr>
                                          </thead>
                                          <tbody>
                                          <tr>
                                              <td>1st</td>
                                              <td>€100<br></td>
                                          </tr>
                                  <tr>
                                              <td>2nd</td>
                                              <td>€60<br></td>
                                          </tr>
                                  <tr>
                                              <td>3rd</td>
                                              <td>€50<br></td>
                                          </tr>
                                  <tr>
                                              <td>4th–10th</td>
                                              <td>€20<br></td>
                                          </tr>
                                  <tr>
                                              <td>11th–50th</td>
                                              <td>€10<br></td>
                                          </tr>
                                  <tr>
                                              <td>51st–100th</td>
                                              <td>€5<br></td>
                                          </tr>
                                  <tr>
                                              <td>101st–1600th</td>
                                              <td>€1<br></td>
                                          </tr>
                                 <tr>
                                              <td>1601st – 5000th</td>
                                              <td>1x Power Up<br></td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                  <p>In the event of a tied position on the leaderboard the cash for those positions will be added together and divided by the number of players tied for that position. E.g if the top two users scored the highest combined total score for the week the 1st and 2nd prizes would be added together and shared (€80 each).</p>
                                  <ul>
                                      <li>Cash will expire 14 days after crediting.</li>
                                      <li>There are no minimum odds requirements to use the Cash.</li>
                                      <li>Cash stake will not be returned with any winnings due.</li>
                                  </ul>
                                  <p> </p>
                                  <h2>When will I get my prize? </h2>
                                  <p>Cash will be credited automatically to your account.</p>
                                  <h2>What else do I need to know?</h2>
                                  <p>There are 10 lives available per player per day. At the end of the day (00:00), any unused lives will expire (i.e unused lives cannot be carried on to the following day). The game is open from 06:00 to 00:00 every day, and every point scored throughout the day accumulates towards your weekly total, with the weekly contests running from 06:00 on the first (Monday) of every calendar week to 23:59 on the last day (Sunday) of every calendar week.</p>
                                  <ul>
                                      <li>Hit the Spot is a free to play game.</li>
                                      <li>The leaderboard updates by 6am daily.</li>
                                      <li>Max weekly Cash €100.</li>
                                      <li>Max stake €10 on Power Ups.</li>
                                      <li>Prizes are valid for 7 days.</li>
                                  </ul>
                                  <p> </p>
                                  <h3>Other boring but essential stuff</h3>
                                  <ul>
                                      <li>This game is valid from April 7. We reserve the right to change or discontinue this promotion at any time, for any reason whatsoever without notice to the players. This will not impact any players who have already started wagering under a promotion.</li>
                                      <li>This promotion is limited to one account per customer. To ensure that the promotion is limited to one per customer, we only permit one customer to participate from each household address, IP Address, email address, telephone number, payment account number (e.g. debit or credit card), and shared computer, e.g. public library or workplace.</li>
                                      <li>We reserve the right to exclude any entrant from Hit The Spot and from use of our website, and to withhold any winnings from entrants, if we believe that such entrant has breached these terms and conditions, has tried to enter by using more than one username or is otherwise engaging in any fraudulent, suspicious or illegal activity (including participation that would be in breach of the law in the entrant’s local jurisdiction), whether or not the entrant would, or might have won any prize but for such activity.</li>
                                  </ul>
                                  <p>If a winning customer has recently opened a new Paddy Power account, the entrant must complete the usual registration process for new Paddy Power customers (which may include submitting certain documentation to allow us to verify their identity) before any winnings from this promotion can be withdrawn. This is required to prevent fraudulent entries, and to ensure that winners have not opened multiple accounts to take part in this promotion.</p>
                                  <p>If you have previously been notified by us that you are excluded from taking part in promotions, you will not qualify for this promotion.</p>
                                  <p>We reserve the right to withdraw the availability of this game to any player or group of players or to modify the terms and conditions of the game at any time.</p>
                                  <p>Paddy Power’s Standard Promotional Terms apply, <a target="_blank" href="https://www.paddypower.com/en/aboutUs/Terms.and.Conditions/">see here</a></p>
                              </div>
                              </div>
                              <div class="c-card-outer">
                                <h3>How and when can I play?</h3>
                                <p>Hit the Spot is a free to play game. A new Weekly Leaderboard contest will run every week. Each player can take part in up to 10 rounds of kicks per day. Each round (also known as a ‘life’) consists of 10 shots. Each contest runs from the first day of each calendar week (Monday) until the final day of the calendar week (Sunday), with the game open between 06:00 till 00:00 every day, as indicated by the countdown timer on the home screen.</p>
                              </div>`,
            //"page_des": "\u003cdiv\u003e\u003cdiv class=\"condition-content\"\u003e\r\n    \u003ch2\u003eWho can take part?\u003c/h2\u003e\r\n    \u003cp\u003eThe game is available for new and existing customers with registered Paddy Power accounts, aged 18 or over.\u003c/p\u003e\r\n    \u003ch2\u003eHow and when can I play?\u003c/h2\u003e\r\n    \u003cp\u003eHit the Spot is a free to play game. A new Weekly Leaderboard contest will run every week. Each player can take part in up to 10 rounds of kicks per day. Each round (also known as a ‘life’) consists of 10 shots. Each contest runs from the first day of each calendar week (Monday) until the final day of the calendar week (Sunday), with the game open between 06:00 till 00:00 every day, as indicated by the countdown timer on the home screen.\u003c/p\u003e\r\n    \u003cp\u003ePoints are calculated by scoring goals and hitting targets as follows. Bonus points can be given to users who use Boosts on individual kicks (such as using a Gold Fireball and receiving quadruple points on the next kick):\u003c/p\u003e\r\n    \u003cdiv class=\"table-content\"\u003e\r\n        \u003ctable width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\u003e\r\n            \u003cthead\u003e\r\n            \u003ctr\u003e\r\n                \u003cth\u003e1 point\u003c/th\u003e\r\n                \u003cth\u003e2 points\u003c/th\u003e\r\n                \u003cth\u003e3 points\u003c/th\u003e\r\n                \u003cth\u003e5 points\u003c/th\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/thead\u003e\r\n            \u003ctbody\u003e\r\n            \u003ctr\u003e\r\n                \u003ctd\u003eGoal\u003c/td\u003e\r\n                \u003ctd\u003e+2 Target\u003cbr\u003e\u003c/td\u003e\r\n                \u003ctd\u003e+3 Target\u003c/td\u003e\r\n                \u003ctd\u003e+5 Target\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/tbody\u003e\r\n        \u003c/table\u003e\r\n    \u003c/div\u003e\r\n    \u003ch2\u003eWhat can I win?\u003c/h2\u003e\r\n    \u003cp\u003eEach week, the prize pool of £2500 in Cash will be distributed to players based on their finishing position on the Ranking Points Weekly Leaderboard:\u003c/p\u003e   \r\n    \u003cdiv class=\"table-content\"\u003e\r\n        \u003ctable width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\u003e\r\n            \u003cthead\u003e\r\n            \u003ctr\u003e\r\n                \u003cth\u003ePosition\u003c/th\u003e\r\n                \u003cth\u003ePrize\u003c/th\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/thead\u003e\r\n            \u003ctbody\u003e\r\n            \u003ctr\u003e\r\n                \u003ctd\u003e1st\u003c/td\u003e\r\n                \u003ctd\u003e£100\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e2nd\u003c/td\u003e\r\n                \u003ctd\u003e£60\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e3rd\u003c/td\u003e\r\n                \u003ctd\u003e£50\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e4th–10th\u003c/td\u003e\r\n                \u003ctd\u003e£20\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e11th–50th\u003c/td\u003e\r\n                \u003ctd\u003e£10\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e51st–100th\u003c/td\u003e\r\n                \u003ctd\u003e£5\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e101st–1600th\u003c/td\u003e\r\n                \u003ctd\u003e£1\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n   \u003ctr\u003e\r\n                \u003ctd\u003e1601st – 5000th\u003c/td\u003e\r\n                \u003ctd\u003e1x Power Up\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/tbody\u003e\r\n        \u003c/table\u003e\r\n    \u003c/div\u003e\r\n    \u003cp\u003eIn the event of a tied position on the leaderboard the Cash for those positions will be added together and divided by the number of players tied for that position. E.g if the top two users scored the highest combined total score for the week the 1st and 2nd prizes would be added together and shared (£80 each).\u003c/p\u003e\r\n    \u003cul\u003e\r\n        \u003cli\u003eCash will expire 14 days after crediting.\u003c/li\u003e\r\n        \u003cli\u003eThere are no minimum odds requirements to use the Cash.\u003c/li\u003e\r\n        \u003cli\u003eCash stake will not be returned with any winnings due.\u003c/li\u003e\r\n    \u003c/ul\u003e\r\n    \u003cp\u003e \u003c/p\u003e\r\n    \u003ch2\u003eWhen will I get my prize? \u003c/h2\u003e\r\n    \u003cp\u003eCash will be credited automatically to your account.\u003c/p\u003e\r\n    \u003ch2\u003eWhat else do I need to know?\u003c/h2\u003e\r\n    \u003cp\u003eThere are 10 lives available per player per day. At the end of the day (00:00), any unused lives will expire (i.e unused lives cannot be carried on to the following day). The game is open from 06:00 to 00:00 every day, and every point scored throughout the day accumulates towards your weekly total, with the weekly contests running from 06:00 on the first (Monday) of every calendar week to 23:59 on the last day (Sunday) of every calendar week.\u003c/p\u003e\r\n    \u003cul\u003e\r\n        \u003cli\u003eHit the Spot is a free to play game.\u003c/li\u003e\r\n        \u003cli\u003eThe leaderboard updates by 6am daily.\u003c/li\u003e\r\n        \u003cli\u003eMax weekly Cash £100.\u003c/li\u003e\r\n        \u003cli\u003eMax stake £10 on Power Ups.\u003c/li\u003e\r\n        \u003cli\u003ePrizes are valid for 7 days.\u003c/li\u003e\r\n    \u003c/ul\u003e\r\n    \u003cp\u003e \u003c/p\u003e\r\n    \u003ch3\u003eOther boring but essential stuff\u003c/h3\u003e\r\n    \u003cul\u003e\r\n        \u003cli\u003eThis game is valid from April 7. We reserve the right to change or discontinue this promotion at any time, for any reason whatsoever without notice to the players. This will not impact any players who have already started wagering under a promotion.\u003c/li\u003e\r\n        \u003cli\u003eThis promotion is limited to one account per customer. To ensure that the promotion is limited to one per customer, we only permit one customer to participate from each household address, IP Address, email address, telephone number, payment account number (e.g. debit or credit card), and shared computer, e.g. public library or workplace.\u003c/li\u003e\r\n        \u003cli\u003eWe reserve the right to exclude any entrant from Hit The Spot and from use of our website, and to withhold any winnings from entrants, if we believe that such entrant has breached these terms and conditions, has tried to enter by using more than one username or is otherwise engaging in any fraudulent, suspicious or illegal activity (including participation that would be in breach of the law in the entrant’s local jurisdiction), whether or not the entrant would, or might have won any prize but for such activity.\u003c/li\u003e\r\n    \u003c/ul\u003e\r\n    \u003cp\u003eIf a winning customer has recently opened a new Paddy Power account, the entrant must complete the usual registration process for new Paddy Power customers (which may include submitting certain documentation to allow us to verify their identity) before any winnings from this promotion can be withdrawn. This is required to prevent fraudulent entries, and to ensure that winners have not opened multiple accounts to take part in this promotion.\u003c/p\u003e\r\n    \u003cp\u003eIf you have previously been notified by us that you are excluded from taking part in promotions, you will not qualify for this promotion.\u003c/p\u003e\r\n    \u003cp\u003eWe reserve the right to withdraw the availability of this game to any player or group of players or to modify the terms and conditions of the game at any time.\u003c/p\u003e\r\n    \u003cp\u003ePaddy Power’s Standard Promotional Terms apply, \u003ca target=\"_blank\" href=\"https://www.paddypower.com/en/aboutUs/Terms.and.Conditions/\"\u003esee here\u003c/a\u003e\u003c/p\u003e\r\n\u003c/div\u003e\u003c/div\u003e",
            "date_added": "2018-10-31 07:17:58",
            "status": "Y"
        },
        loader: false
    },
    nav: {
        data: [
            {
                "page_id": 2,
                "game_id": 1,
                "page_name": "FAQ",
                "page_heading": "FAQ",
                "page_url": "faq",
                "page_des": "\u003cp\u003e\u003cbr\u003e\u003c/p\u003e\u003ctable class=\"table table-bordered\"\u003e\u003ctbody\u003e\u003ctr\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003c/tr\u003e\u003ctr\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003ctd\u003e\u003cbr\u003e\u003c/td\u003e\u003c/tr\u003e\u003c/tbody\u003e\u003c/table\u003e\u003cp\u003e\u003cimg data-filename=\"Screen Shot 2018-11-16 at 15.30.30.png\" xss=\"removed\"\u003e\u003cbr\u003e\u003c/p\u003e",
                "date_added": "2018-09-25 09:57:24",
                "status": "Y"
            },
            {
                "page_id": 3,
                "game_id": 1,
                "page_name": "Prizes",
                "page_heading": "Prizes",
                "page_url": "prizes",
                "page_des": " \u003cdiv class=\"inner-prize-section\"\u003e\r\n                          \u003cdiv class=\"prize-content\"\u003e\r\n                          \u003cdiv class=\"prize-top\"\u003e\r\n                            \u003ch2\u003e£10,000\u003c/h2\u003e\r\n                            \u003ch3\u003ein August\u003c/h3\u003e\r\n                            \u003ch4\u003eScore within a tier \u0026 win a prize in the highest tier you reach.\u003c/h4\u003e\r\n                          \u003c/div\u003e\r\n                          \r\n                          \u003cdiv class=\"prize-types\"\u003e\r\n                          \u003cdiv class=\"badge-col\"\u003e\r\n                          \u003cdiv class=\"prize-box\"\u003e\r\n                          \u003cfigure class=\"badge-texture\"\u003e\u003cimg src=\"/assets/images/bronze-bx.png\" alt=\"bronze\"\u003e\u003c/figure\u003e\r\n                          \r\n                          \u003cdiv class=\"badge-outer\"\u003e\r\n                          \u003cdiv class=\"prize-badge\"\u003e\u003cfigure\u003e\u003cimg src=\"/assets/images/bronze.png\" alt=\"\"\u003e\u003c/figure\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cspan class=\"badge-title\"\u003eBronze Tier\u003c/span\u003e\r\n                          \r\n                          \u003cdiv class=\"badge-info\"\u003e\r\n                          \u003cdiv class=\"badge-info-outer\"\u003e\r\n                          \u003cdiv class=\"col\"\u003e\r\n                          \u003cstrong\u003e5,000\u003c/strong\u003e\r\n                          \u003cspan\u003ePoints Needed\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cdiv class=\"col\"\u003e\r\n                          \u003cstrong\u003e2,000\u003c/strong\u003e\r\n                          \u003cspan\u003eGold\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cdiv class=\"badge-col\"\u003e\r\n                          \u003cdiv class=\"prize-box\"\u003e\r\n                          \u003cfigure class=\"badge-texture\"\u003e\u003cimg src=\"/assets/images/silver-bx.png\" alt=\"bronze\"\u003e\u003c/figure\u003e\r\n                          \r\n                          \u003cdiv class=\"badge-outer\"\u003e\r\n                          \u003cdiv class=\"prize-badge\"\u003e\u003cfigure\u003e\u003cimg src=\"/assets/images/silver.png\" alt=\"\"\u003e\u003c/figure\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cspan class=\"badge-title\"\u003esilver Tier\u003c/span\u003e\r\n                          \r\n                          \u003cdiv class=\"badge-info\"\u003e\r\n                          \u003cdiv class=\"badge-info-outer\"\u003e\r\n                          \u003cdiv class=\"col\"\u003e\r\n                          \u003cstrong\u003e7,000\u003c/strong\u003e\r\n                          \u003cspan\u003ePoints Needed\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cdiv class=\"col\"\u003e\r\n                          \u003cstrong\u003e3,000\u003c/strong\u003e\r\n                          \u003cspan\u003eGold\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cdiv class=\"badge-col\"\u003e\r\n                          \u003cdiv class=\"prize-box\"\u003e\r\n                          \u003cfigure class=\"badge-texture\"\u003e\u003cimg src=\"/assets/images/gold-bx.png\" alt=\"bronze\"\u003e\u003c/figure\u003e\r\n                          \r\n                          \u003cdiv class=\"badge-outer\"\u003e\r\n                          \u003cdiv class=\"prize-badge\"\u003e\u003cfigure\u003e\u003cimg src=\"/assets/images/gold_batch.png\" alt=\"\"\u003e\u003c/figure\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cspan class=\"badge-title\"\u003eGold Tier\u003c/span\u003e\r\n                          \r\n                          \u003cdiv class=\"badge-info\"\u003e\r\n                          \u003cdiv class=\"badge-info-outer\"\u003e\r\n                          \u003cdiv class=\"col\"\u003e\r\n                          \u003cstrong\u003e8,000\u003c/strong\u003e\r\n                          \u003cspan\u003ePoints Needed\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003cdiv class=\"col\"\u003e\r\n                          \u003cstrong\u003e5,000\u003c/strong\u003e\r\n                          \u003cspan\u003eGold\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \r\n                          \u003c/div\u003e\r\n                          \r\n                          \u003cdiv class=\"prize-bottom\"\u003e\r\n                          \u003cspan\u003e10 lives per day | Each game resets at midnight\u003c/span\u003e\r\n                          \u003c/div\u003e\r\n                          \u003c/div\u003e\r\n                          \r\n                          \r\n                        \u003c/div\u003e",
                "date_added": "2018-09-25 10:03:50",
                "status": "Y"
            },
            {
                "page_id": 4,
                "game_id": 1,
                "page_name": "My History",
                "page_heading": "My History",
                "page_url": "my-history",
                "page_des": "Lorem Ipsium is a dummy text of typesetting industory",
                "date_added": "2018-09-25 10:03:51",
                "status": "Y"
            },
            // {
            //     "page_id": 6,
            //     "game_id": 1,
            //     "page_name": "Safer Gambling",
            //     "page_heading": "Responsible Gambling",
            //     "page_url": "responsible-gambling",
            //     "page_des": "\u003cdiv class=\"content-mid  scroll-bar responsible-scroll-bar\"\u003e\r\n                    \u003cdiv class=\"gambiling-block\"\u003e\r\n                    \u003cdiv class=\"gambiling-icon-block\"\u003e\r\n                    \u003ca target=\"_blank\" href=\"https://support.paddypower.com/app/answers/detail/a_id/70/\"\u003e\u003cfigure\u003e\u003cimg src=\"assets/images/icon-18.svg\" alt=\"\"\u003e\u003c/figure\u003e\u003c/a\u003e\r\n                    \u003c/div\u003e\r\n\r\n                    \u003cdiv class=\"gambiling-text\"\u003e\r\n                    \u003ca target=\"_blank\" href=\"https://responsiblegaming.paddypower.com/\"\u003eGambling can be addictive, \r\n                  please play responsibly\u003c/a\u003e\r\n                    \u003c/div\u003e\r\n                    \u003c/div\u003e\r\n                   \r\n                  \u003c/div\u003e",
            //     "date_added": "2018-09-25 10:03:52",
            //     "status": "Y"
            // },
            // {
            //     "page_id": 8,
            //     "game_id": 1,
            //     "page_name": "Refer a Friend",
            //     "page_heading": "Refer a Friend",
            //     "page_url": "refer-a-friend",
            //     "page_des": " \u003cdiv class=\"left-block\"\u003e\r\n                                            \u003cdiv class=\"inner-left-block\"\u003e\r\n                                                \u003cdiv class=\"img-block\"\u003e\r\n                                                    \u003cfigure\u003e\u003cimg src=\"assets/images/fri-benefits.png\" alt=\"\"\u003e\u003c/figure\u003e\r\n                                                \u003c/div\u003e\r\n                                            \u003c/div\u003e\r\n                                        \u003c/div\u003e\r\n                                        \u003cdiv class=\"right-block\"\u003e\r\n\r\n                                            \u003cdiv class=\"right-content-mid \"\u003e\r\n                                                \u003ch2\u003eREFER YOUR FRIENDS AND GET UP TO €50 IN Cash\u003c/h2\u003e\r\n                                                \u003cp\u003eFriends...or maybe more?\u003c/p\u003e\r\n\r\n                                                \u003cp\u003eRefer a friend to Paddy Power and if they meet the requirements, you'll get a €10 Cash.\u003c/p\u003e\r\n\r\n                                                \u003cp\u003eYou can refer 5 friends in total and earn up to €50.\u003c/p\u003e\r\n                                                \u003ch3\u003eSHARE YOUR PERSONAL REFERRAL CODE TO EARN A REWARD\u003c/h3\u003e\r\n                                                \u003cdiv class=\"btn-refer\"\u003e\u003ca target=\"_blank\" class=\"dark-green-btn\" href=\"https://promos.paddypower.com/promotion?promoCode=fwbautosports \"\u003eRefer A Friend Now\u003c/a\u003e\u003c/div\u003e\r\n                                                \u003cp\u003eBy taking part in this promotion you accept the \u003ca href=\"#\"\u003eterms and conditions.\u003c/a\u003e\u003c/p\u003e\r\n\r\n\r\n                                            \u003c/div\u003e\r\n                                        \u003c/div\u003e",
            //     "date_added": "2018-10-31 07:17:58",
            //     "status": "Y"
            // },
            {
                "page_id": 9,
                "game_id": 1,
                "page_name": "Terms \u0026 Conditions",
                "page_heading": "Terms \u0026 Conditions",
                "page_url": "terms-and-conditions",
                "page_des": "\u003cdiv\u003e\u003cdiv class=\"condition-content\"\u003e\r\n    \u003ch2\u003eWho can take part?\u003c/h2\u003e\r\n    \u003cp\u003eThe game is available for new and existing customers with registered Paddy Power accounts, aged 18 or over.\u003c/p\u003e\r\n    \u003ch2\u003eHow and when can I play?\u003c/h2\u003e\r\n    \u003cp\u003eHit the Spot is a free to play game. A new Weekly Leaderboard contest will run every week. Each player can take part in up to 10 rounds of kicks per day. Each round (also known as a ‘life’) consists of 10 shots. Each contest runs from the first day of each calendar week (Monday) until the final day of the calendar week (Sunday), with the game open between 06:00 till 00:00 every day, as indicated by the countdown timer on the home screen.\u003c/p\u003e\r\n    \u003cp\u003ePoints are calculated by scoring goals and hitting targets as follows. Bonus points can be given to users who use Boosts on individual kicks (such as using a Gold Fireball and receiving quadruple points on the next kick):\u003c/p\u003e\r\n    \u003cdiv class=\"table-content\"\u003e\r\n        \u003ctable width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\u003e\r\n            \u003cthead\u003e\r\n            \u003ctr\u003e\r\n                \u003cth\u003e1 point\u003c/th\u003e\r\n                \u003cth\u003e2 points\u003c/th\u003e\r\n                \u003cth\u003e3 points\u003c/th\u003e\r\n                \u003cth\u003e5 points\u003c/th\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/thead\u003e\r\n            \u003ctbody\u003e\r\n            \u003ctr\u003e\r\n                \u003ctd\u003eGoal\u003c/td\u003e\r\n                \u003ctd\u003e+2 Target\u003cbr\u003e\u003c/td\u003e\r\n                \u003ctd\u003e+3 Target\u003c/td\u003e\r\n                \u003ctd\u003e+5 Target\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/tbody\u003e\r\n        \u003c/table\u003e\r\n    \u003c/div\u003e\r\n    \u003ch2\u003eWhat can I win?\u003c/h2\u003e\r\n    \u003cp\u003eEach week, the prize pool of £2500 in Cash will be distributed to players based on their finishing position on the Ranking Points Weekly Leaderboard:\u003c/p\u003e   \r\n    \u003cdiv class=\"table-content\"\u003e\r\n        \u003ctable width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\u003e\r\n            \u003cthead\u003e\r\n            \u003ctr\u003e\r\n                \u003cth\u003ePosition\u003c/th\u003e\r\n                \u003cth\u003ePrize\u003c/th\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/thead\u003e\r\n            \u003ctbody\u003e\r\n            \u003ctr\u003e\r\n                \u003ctd\u003e1st\u003c/td\u003e\r\n                \u003ctd\u003e£100\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e2nd\u003c/td\u003e\r\n                \u003ctd\u003e£60\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e3rd\u003c/td\u003e\r\n                \u003ctd\u003e£50\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e4th–10th\u003c/td\u003e\r\n                \u003ctd\u003e£20\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e11th–50th\u003c/td\u003e\r\n                \u003ctd\u003e£10\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e51st–100th\u003c/td\u003e\r\n                \u003ctd\u003e£5\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n    \u003ctr\u003e\r\n                \u003ctd\u003e101st–1600th\u003c/td\u003e\r\n                \u003ctd\u003e£1\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n   \u003ctr\u003e\r\n                \u003ctd\u003e1601st – 5000th\u003c/td\u003e\r\n                \u003ctd\u003e1x Power Up\u003cbr\u003e\u003c/td\u003e\r\n            \u003c/tr\u003e\r\n            \u003c/tbody\u003e\r\n        \u003c/table\u003e\r\n    \u003c/div\u003e\r\n    \u003cp\u003eIn the event of a tied position on the leaderboard the Cash for those positions will be added together and divided by the number of players tied for that position. E.g if the top two users scored the highest combined total score for the week the 1st and 2nd prizes would be added together and shared (£80 each).\u003c/p\u003e\r\n    \u003cul\u003e\r\n        \u003cli\u003eCash will expire 14 days after crediting.\u003c/li\u003e\r\n        \u003cli\u003eThere are no minimum odds requirements to use the Cash.\u003c/li\u003e\r\n        \u003cli\u003eCash stake will not be returned with any winnings due.\u003c/li\u003e\r\n    \u003c/ul\u003e\r\n    \u003cp\u003e \u003c/p\u003e\r\n    \u003ch2\u003eWhen will I get my prize? \u003c/h2\u003e\r\n    \u003cp\u003eCash will be credited automatically to your account.\u003c/p\u003e\r\n    \u003ch2\u003eWhat else do I need to know?\u003c/h2\u003e\r\n    \u003cp\u003eThere are 10 lives available per player per day. At the end of the day (00:00), any unused lives will expire (i.e unused lives cannot be carried on to the following day). The game is open from 06:00 to 00:00 every day, and every point scored throughout the day accumulates towards your weekly total, with the weekly contests running from 06:00 on the first (Monday) of every calendar week to 23:59 on the last day (Sunday) of every calendar week.\u003c/p\u003e\r\n    \u003cul\u003e\r\n        \u003cli\u003eHit the Spot is a free to play game.\u003c/li\u003e\r\n        \u003cli\u003eThe leaderboard updates by 6am daily.\u003c/li\u003e\r\n        \u003cli\u003eMax weekly Cash £100.\u003c/li\u003e\r\n        \u003cli\u003eMax stake £10 on Power Ups.\u003c/li\u003e\r\n        \u003cli\u003ePrizes are valid for 7 days.\u003c/li\u003e\r\n    \u003c/ul\u003e\r\n    \u003cp\u003e \u003c/p\u003e\r\n    \u003ch3\u003eOther boring but essential stuff\u003c/h3\u003e\r\n    \u003cul\u003e\r\n        \u003cli\u003eThis game is valid from April 7. We reserve the right to change or discontinue this promotion at any time, for any reason whatsoever without notice to the players. This will not impact any players who have already started wagering under a promotion.\u003c/li\u003e\r\n        \u003cli\u003eThis promotion is limited to one account per customer. To ensure that the promotion is limited to one per customer, we only permit one customer to participate from each household address, IP Address, email address, telephone number, payment account number (e.g. debit or credit card), and shared computer, e.g. public library or workplace.\u003c/li\u003e\r\n        \u003cli\u003eWe reserve the right to exclude any entrant from Hit The Spot and from use of our website, and to withhold any winnings from entrants, if we believe that such entrant has breached these terms and conditions, has tried to enter by using more than one username or is otherwise engaging in any fraudulent, suspicious or illegal activity (including participation that would be in breach of the law in the entrant’s local jurisdiction), whether or not the entrant would, or might have won any prize but for such activity.\u003c/li\u003e\r\n    \u003c/ul\u003e\r\n    \u003cp\u003eIf a winning customer has recently opened a new Paddy Power account, the entrant must complete the usual registration process for new Paddy Power customers (which may include submitting certain documentation to allow us to verify their identity) before any winnings from this promotion can be withdrawn. This is required to prevent fraudulent entries, and to ensure that winners have not opened multiple accounts to take part in this promotion.\u003c/p\u003e\r\n    \u003cp\u003eIf you have previously been notified by us that you are excluded from taking part in promotions, you will not qualify for this promotion.\u003c/p\u003e\r\n    \u003cp\u003eWe reserve the right to withdraw the availability of this game to any player or group of players or to modify the terms and conditions of the game at any time.\u003c/p\u003e\r\n    \u003cp\u003ePaddy Power’s Standard Promotional Terms apply, \u003ca target=\"_blank\" href=\"https://www.paddypower.com/en/aboutUs/Terms.and.Conditions/\"\u003esee here\u003c/a\u003e\u003c/p\u003e\r\n\u003c/div\u003e\u003c/div\u003e",
                "date_added": "2018-10-31 07:17:58",
                "status": "Y"
            }
        ],
        activeIndex: null,
    },
    isNavOpen: false,
    myHistory: { data: null, loader: true, winPrice: 0 },
    isShowIframe: false,
    isUserSuspended: false,
    leaderboardPrizesData: null
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FAQ:
            return { ...state, faq: action.payload };
        case ActionTypes.PAGE_CONTENT:
            return { ...state, pageContent: action.payload };
        case ActionTypes.NAV_PAGE_LIST:
            return { ...state, nav: { ...state.nav, data: action.payload } };
        case ActionTypes.IS_SHOW_IFRAME:
            return { ...state, ...action.payload };
        case ActionTypes.USER_IS_SUSPENDED:
            return { ...state, ...action.payload };
        case ActionTypes.GET_LEADERBOARD_PRIZES_DATA:
            return { ...state, ...action.payload };
        //case ActionTypes.GROUP_DETAIL:
        case ActionTypes.GROUP_DETAIL_HTS:
        case ActionTypes.GROUP_DETAIL_MGI:
        case ActionTypes.GROUP_DETAIL_TRIVIA:
        case ActionTypes.GROUP_DETAIL_HG:
        case ActionTypes.GROUP_DETAIL_HEADERS:
            return { ...state, myHistory: { ...state.myHistory, ...action.payload } };
        default:
            return { ...state }
    }
};
export default reducer;