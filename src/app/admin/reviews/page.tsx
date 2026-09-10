'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, Search, Filter, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { db, Review } from '@/lib/db';
import HairOilLoader from '@/components/HairOilLoader';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [ratingFilter, setRatingFilter] = useState<string>('all');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const loadReviews = async () => {
    setLoading(true);
    const data = await db.getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: 'approved' | 'pending' | 'rejected') => {
    await db.updateReviewStatus(id, newStatus);
    setSuccessMsg(`Review status updated to ${newStatus}`);
    setTimeout(() => setSuccessMsg(''), 3000);
    loadReviews();
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm('Are you sure you want to delete this customer review?')) {
      await db.deleteReview(id);
      setSuccessMsg('Review deleted successfully');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadReviews();
    }
  };

  // Filtered reviews calculation
  const filteredReviews = reviews.filter((r) => {
    const matchesSearch =
      r.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.user_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesRating = ratingFilter === 'all' || r.rating === parseInt(ratingFilter, 10);

    return matchesSearch && matchesStatus && matchesRating;
  });

  // Calculate statistics
  const totalReviews = reviews.length;
  const approvedCount = reviews.filter((r) => r.status === 'approved').length;
  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const rejectedCount = reviews.filter((r) => r.status === 'rejected').length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  if (loading) {
    return <HairOilLoader size="lg" />;
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#2E5E3E] tracking-tight font-serif">Customer Reviews</h1>
          <p className="text-xs text-slate-500 font-light mt-1">
            Moderate, approve, and manage customer product feedback across your store.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Reviews</span>
            <div className="p-2.5 bg-emerald-50 text-[#2E5E3E] rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-[#2E5E3E] mt-3">{totalReviews}</p>
        </div>

        <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Rating</span>
            <div className="p-2.5 bg-amber-50 text-[#D4954B] rounded-xl">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-3">
            <p className="text-3xl font-extrabold text-[#2E5E3E]">{avgRating}</p>
            <span className="text-xs text-slate-400 font-light">/ 5.0</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Approval</span>
            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 mt-3">{pendingCount}</p>
        </div>

        <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Approved</span>
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 mt-3">{approvedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/70 p-5 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, product, comment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30 focus:border-[#2E5E3E]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
            {/* Status Pills */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              {['all', 'approved', 'pending', 'rejected'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                    statusFilter === st
                      ? 'bg-white text-[#2E5E3E] shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {st} {st === 'pending' && pendingCount > 0 && `(${pendingCount})`}
                </button>
              ))}
            </div>

            {/* Rating Filter Dropdown */}
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2E5E3E]/30"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="bg-white border border-slate-200/70 rounded-2xl overflow-hidden shadow-xs">
        {filteredReviews.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-700">No reviews found</h3>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Customer</th>
                  <th className="py-3.5 px-5">Product</th>
                  <th className="py-3.5 px-5">Rating & Review</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Date</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredReviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Customer */}
                    <td className="py-4 px-5 align-top">
                      <div className="font-bold text-[#2E5E3E]">{rev.user_name}</div>
                      <div className="text-[11px] text-slate-400 font-light mt-0.5">{rev.user_email}</div>
                    </td>

                    {/* Product */}
                    <td className="py-4 px-5 align-top font-semibold text-slate-700 max-w-[160px] truncate">
                      {rev.product_name}
                    </td>

                    {/* Rating & Review */}
                    <td className="py-4 px-5 align-top space-y-1 max-w-xs sm:max-w-md">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'text-[#D4954B] fill-[#D4954B]'
                                : 'text-slate-200'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-[11px] font-bold text-slate-600">({rev.rating}/5)</span>
                      </div>
                      <div className="font-bold text-slate-900">{rev.title}</div>
                      <p className="text-slate-600 font-light text-[11px] leading-relaxed line-clamp-3">
                        {rev.comment}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-5 align-top">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          rev.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rev.status === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            rev.status === 'approved'
                              ? 'bg-emerald-600'
                              : rev.status === 'pending'
                              ? 'bg-amber-600'
                              : 'bg-red-600'
                          }`}
                        />
                        {rev.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 align-top text-slate-400 font-light text-[11px] whitespace-nowrap">
                      {new Date(rev.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-5 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {rev.status !== 'approved' && (
                          <button
                            onClick={() => handleUpdateStatus(rev.id, 'approved')}
                            title="Approve Review"
                            className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {rev.status !== 'rejected' && (
                          <button
                            onClick={() => handleUpdateStatus(rev.id, 'rejected')}
                            title="Reject Review"
                            className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          title="Delete Review"
                          className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
