/**
 * @openapi
 * /api/v1/nasa/apod:
 *   get:
 *     tags: [NASA]
 *     summary: Astronomy Picture of the Day
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *     responses:
 *       200:
 *         description: APOD response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/ApodResponse"
 */

/**
 * @openapi
 * /api/v1/nasa/neo:
 *   get:
 *     tags: [NASA]
 *     summary: Near-Earth Object feed
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-07"
 *     responses:
 *       200:
 *         description: NEO feed (processed for chart)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NeoFeedChartResponse"
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     ApodResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             copyright:
 *               type: string
 *             date:
 *               type: string
 *               format: date
 *             explanation:
 *               type: string
 *             hdurl:
 *               type: string
 *               format: uri
 *             media_type:
 *               type: string
 *             title:
 *               type: string
 *             url:
 *               type: string
 *               format: uri
 *
 *     NeoFeedChartResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             chartData:
 *               type: array
 *               description: Array of NEO counts per day
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date
 *                   count:
 *                     type: integer
 *             totalNEOs:
 *               type: integer
 *               description: Total NEOs in the date range
 *             days:
 *               type: integer
 *               description: Number of days in the range
 *             avgPerDay:
 *               type: number
 *               description: Average NEOs per day
 *
 *     NeoObject:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         absolute_magnitude_h:
 *           type: number
 *         is_potentially_hazardous_asteroid:
 *           type: boolean
 *         close_approach_data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               close_approach_date:
 *                 type: string
 *                 format: date
 *               relative_velocity:
 *                 type: object
 *                 properties:
 *                   kilometers_per_second:
 *                     type: string
 *               miss_distance:
 *                 type: object
 *                 properties:
 *                   kilometers:
 *                     type: string
 */
