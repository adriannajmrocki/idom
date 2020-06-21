'use strict';
module.exports = {
  get: () => {
    return Promise.resolve({
      data: [
        {
          id: 1,
          username: 'admin',
          email: 'admin@admin.pl',
          telephone: '+48538111222',
          is_active: true,
          is_staff: true,
          app_notifications: true,
          sms_notifications: true
        },
        {
          id: 2,
          username: 'test',
          email: 'test@test.pl',
          telephone: '+48538111333',
          is_active: true,
          is_staff: false,
          app_notifications: true,
          sms_notifications: true
        }
      ]
    });
  }
};