import React from 'react';
import './SkeletonJobCard.css';

const SkeletonJobCard = () => {
    return (
        <div className="job-card glass-panel skeleton-card">
            <div className="job-card-header">
                <div className="company-info">
                    <div className="skeleton skeleton-logo"></div>
                    <div>
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-subtitle"></div>
                    </div>
                </div>
            </div>

            <div className="job-tags">
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
                <div className="skeleton skeleton-tag"></div>
            </div>

            <div className="match-details skeleton-match-bg">
                <div className="skeleton skeleton-text" style={{ width: '60%', marginBottom: '8px' }}></div>
                <div className="matching-skills">
                    <div className="skeleton skeleton-tag-match"></div>
                    <div className="skeleton skeleton-tag-match"></div>
                </div>
            </div>

            <div className="job-card-footer">
                <div className="skeleton skeleton-text" style={{ width: '40%' }}></div>
                <div className="skeleton skeleton-button"></div>
            </div>
        </div>
    );
};

export default SkeletonJobCard;
