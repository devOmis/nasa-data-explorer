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
 *         description: NEO feed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/NeoFeedResponse"
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
 *     NeoFeedResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           properties:
 *             element_count:
 *               type: integer
 *             near_earth_objects:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   $ref: "#/components/schemas/NeoObject"
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
