import React, { useState } from 'react';
import {
    Bell,
    CheckCircle2,
    Trash2,
    Info,
    Clock,
    AlertTriangle,
    CheckCircle
} from 'lucide-react';

const UserNotification = () => {
    const [filter, setFilter] = useState('all');

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            sender: "System",
            title: "Resume Updated",
            message: "Your resume has been successfully updated.",
            time: "2 hours ago",
            type: "success",
            isUnread: true,
            icon: CheckCircle
        },
        {
            id: 2,
            sender: "AI Coach",
            title: "New Suggestion",
            message: "You have a new suggestion for your skills section.",
            time: "5 hours ago",
            type: "info",
            isUnread: true,
            icon: Info
        },
        {
            id: 3,
            sender: "System",
            title: "Subscription Alert",
            message: "Your subscription is expiring soon.",
            time: "1 day ago",
            type: "warning",
            isUnread: false,
            icon: AlertTriangle
        }
    ]);

    const handleMarkRead = (id) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, isUnread: false } : n
        ));
    };

    const handleDelete = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleMarkAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isUnread: false })));
    };

    const handleClearAll = () => {
        setNotifications([]);
    };

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => n.isUnread);

    const getTypeStyles = (type) => {
        switch (type) {
            case 'success': return 'bg-green-100 text-green-600';
            case 'warning': return 'bg-orange-100 text-orange-600';
            case 'info': return 'bg-blue-100 text-blue-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Bell className="w-6 h-6" />
                        My Notifications
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Stay updated with your resume status and AI insights
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={handleMarkAllRead}
                        className="px-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        Mark all read
                    </button>
                    <button
                        onClick={handleClearAll}
                        className="px-4 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors"
                    >
                        Clear all
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-3 text-sm font-medium transition-all relative ${filter === 'all'
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    All Notifications
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                        {notifications.length}
                    </span>
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={`pb-3 text-sm font-medium transition-all relative ${filter === 'unread'
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Unread
                    <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs">
                        {notifications.filter(n => n.isUnread).length}
                    </span>
                </button>
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                        <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">No notifications found</p>
                    </div>
                ) : (
                    filteredNotifications.map((notification) => {
                        const Icon = notification.icon;
                        return (
                            <div
                                key={notification.id}
                                className={`flex gap-4 p-4 rounded-xl border transition-all ${notification.isUnread
                                        ? "bg-white border-blue-100 shadow-sm"
                                        : "bg-gray-50/50 border-gray-100"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${getTypeStyles(notification.type)}`}>
                                    <Icon size={20} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className={`text-base ${notification.isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                {notification.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {notification.message}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-400 whitespace-nowrap ml-4 flex items-center gap-1">
                                            <Clock size={12} />
                                            {notification.time}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3">
                                        {notification.isUnread && (
                                            <button
                                                onClick={() => handleMarkRead(notification.id)}
                                                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                            >
                                                <CheckCircle2 size={14} />
                                                Mark as read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(notification.id)}
                                            className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default UserNotification;
