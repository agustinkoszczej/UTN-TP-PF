import api from '@config/api';
import { AUCTION_STATUS } from '@constants/auctionStatus';

const getActiveAuctions = page => api.get('/merchants/auctions', { page, status: AUCTION_STATUS.ACTIVE });
const getClosedAuctions = page => api.get('/merchants/auctions', { page, status: AUCTION_STATUS.CLOSED });
const getExpiredAuctions = page => api.get('/merchants/auctions', { page, status: AUCTION_STATUS.EXPIRED });

const getAuctionById = id => api.get(`/merchants/auctions/${id}`);

const createAuction = auction => api.post('/merchants/auctions', auction);

export default {
  getActiveAuctions,
  getClosedAuctions,
  getExpiredAuctions,
  getAuctionById,
  createAuction
};
