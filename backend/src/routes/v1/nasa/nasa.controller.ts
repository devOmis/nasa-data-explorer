import { asyncHandler } from '@/common/utils/asyncHandler';
import type {
  ApodQuery,
  NeoFeedQuery,
} from './nasa.types';

import nasaService from './nasa.service';

export const getApod = asyncHandler(async (req, res, next) => {
  const query = req.query as ApodQuery;
  const result = await nasaService.fetchApod(query.date);
  res.json({ data: result.data });
});

export const getNeoFeed = asyncHandler(async (req, res, next) => {
    const query = req.query as unknown as NeoFeedQuery;

    const { start_date, end_date} = query;
    const result = await nasaService.fetchNeoFeed({
      start_date,
      end_date,
    });
    res.json({ data: result.data });

});
