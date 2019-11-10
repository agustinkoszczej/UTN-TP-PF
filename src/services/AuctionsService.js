import api from '@config/api';
import { AUCTION_STATUS } from '@constants/auctionStatus';

const getActiveAuctions = page => api.get('/merchants/auctions', { page, status: AUCTION_STATUS.ACTIVE });
const getClosedAuctions = page => api.get('/merchants/auctions', { page, status: AUCTION_STATUS.CLOSED });
const getExpiredAuctions = page => api.get('/merchants/auctions', { page, status: AUCTION_STATUS.EXPIRED });

const getAuctionById = id => api.get(`/merchants/auctions/${id}`);

const createAuction = auction => api.post('/merchants/auctions', auction);

const acceptBid = ({ id }) => api.patch(`/merchants/bids/${id}`, { status: 'ACCEPTED' });
const declineBid = ({ id }) => api.patch(`/merchants/bids/${id}`, { status: 'DECLINED' });

export default {
  getActiveAuctions,
  getClosedAuctions,
  getExpiredAuctions,
  getAuctionById,
  createAuction,
  acceptBid,
  declineBid
};
