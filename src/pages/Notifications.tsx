import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  DollarSign,
  Info,
  Lightbulb,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  type: "booking" | "deal" | "reminder" | "tip" | "warning";
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionLabel?: string;
  actionUrl?: string;
}

interface TravelTip {
  id: string;
  category: "packing" | "safety" | "culture" | "budget" | "general";
  title: string;
  content: string;
  icon: string;
}

export default function NotificationsCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [travelTips] = useState<TravelTip[]>([
    {
      id: "1",
      category: "packing",
      title: "Pack Light, Travel Smart",
      content:
        "Bring versatile clothing that can be mixed and matched. Roll clothes instead of folding to save space.",
      icon: "🎒",
    },
    {
      id: "2",
      category: "safety",
      title: "Keep Digital Copies",
      content:
        "Always keep digital copies of important documents (passport, ID, insurance) in cloud storage.",
      icon: "🔒",
    },
    {
      id: "3",
      category: "budget",
      title: "Local Currency Tips",
      content:
        "Notify your bank of travel plans and research the best places to exchange money at your destination.",
      icon: "💰",
    },
    {
      id: "4",
      category: "culture",
      title: "Learn Basic Phrases",
      content:
        "Learning 'hello', 'thank you', and 'excuse me' in the local language goes a long way.",
      icon: "🗣️",
    },
    {
      id: "5",
      category: "general",
      title: "Book Accommodations Early",
      content:
        "Popular destinations fill up quickly, especially during peak seasons. Book 2-3 months in advance.",
      icon: "🏨",
    },
    {
      id: "6",
      category: "safety",
      title: "Travel Insurance",
      content:
        "Don't skip travel insurance. It can save you thousands if something goes wrong.",
      icon: "🛡️",
    },
  ]);

  useEffect(() => {
    // Generate sample notifications
    const sampleNotifications: Notification[] = [
      {
        id: "1",
        type: "booking",
        title: "Booking Confirmation",
        message: "Your trip to Paris has been confirmed for March 15, 2025",
        date: new Date().toISOString(),
        read: false,
        actionLabel: "View Details",
        actionUrl: "/dashboard",
      },
      {
        id: "2",
        type: "deal",
        title: "Special Offer: 20% Off",
        message:
          "Limited time offer on Mediterranean destinations. Book by this weekend!",
        date: new Date(Date.now() - 86400000).toISOString(),
        read: false,
        actionLabel: "View Deals",
        actionUrl: "/",
      },
      {
        id: "3",
        type: "reminder",
        title: "Trip Reminder",
        message:
          "Don't forget to check in for your flight 24 hours before departure",
        date: new Date(Date.now() - 172800000).toISOString(),
        read: true,
      },
      {
        id: "4",
        type: "tip",
        title: "Travel Tip of the Day",
        message:
          "Pack a portable charger - you'll need it for those long sightseeing days!",
        date: new Date(Date.now() - 259200000).toISOString(),
        read: true,
      },
    ];

    setNotifications(sampleNotifications);
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "deal":
        return <DollarSign className="h-5 w-5 text-blue-500" />;
      case "reminder":
        return <Calendar className="h-5 w-5 text-orange-500" />;
      case "tip":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold flex items-center space-x-3">
            <Bell className="h-8 w-8" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Stay updated on your travel plans
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          }}
        >
          Mark All as Read
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notifications List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-semibold">Recent Notifications</h2>

          {notifications.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No notifications
                </h3>
                <p className="text-gray-600">You're all caught up!</p>
              </CardContent>
            </Card>
          ) : (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`${
                    !notification.read ? "border-blue-300 bg-blue-50" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="text-lg font-semibold">
                              {notification.title}
                            </h4>
                            <p className="text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                              {new Date(notification.date).toLocaleDateString()}{" "}
                              at{" "}
                              {new Date(notification.date).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissNotification(notification.id)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center space-x-3 mt-4">
                          {notification.actionLabel && (
                            <Button size="sm">
                              {notification.actionLabel}
                            </Button>
                          )}
                          {!notification.read && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as Read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        {/* Travel Tips Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5" />
                <span>Travel Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {travelTips.slice(0, 3).map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-semibold text-sm">{tip.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {tip.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Button variant="outline" size="sm" className="w-full">
                View All Tips
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Unread notifications
                </span>
                <span className="font-semibold">{unreadCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">This week</span>
                <span className="font-semibold">{notifications.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Upcoming trips</span>
                <span className="font-semibold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
