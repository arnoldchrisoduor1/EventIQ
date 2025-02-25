const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  basicInfo: {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['concert', 'conference', 'workshop', 'sports', 'exhibition', 'other']
    },
    tags: [{
      type: String,
      trim: true
    }],
    status: {
      type: String,
      required: true,
      enum: ['draft', 'published', 'cancelled', 'postponed', 'completed'],
      default: 'draft'
    }
  },

  media: {
    banner: {
      type: String,
      required: true
    },
    files: [{
      name: String,
      url: String,
      type: String
    }]
  },

  datetime: {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    setupTime: String,
    teardownTime: String
  },

  location: {
    name: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },

  capacity: {
    total: {
      type: Number,
      // required: true
    },
    ageRestriction: {
      minimum: Number,
      maximum: Number,
      required: Boolean
    }
  },

  organizer: {
    name: {
      type: String,
    //   required: true
    },
    contactEmail: String,
    contactPhone: String,
    website: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedIn: String
    }
  },

  schedule: [{
    time: String,
    title: String,
    description: String,
    speaker: {
      name: String,
      bio: String,
      photo: String,
      email: String
    }
  }],

  ticketing: [{
    name: String,
    price: Number,
    quantity: Number,
    description: String,
    earlyBirdDeadline: String,
    earlyBirdPrice: Number
  }],

  additionalInfo: {
    entryRequirements: {
      dressCode: String,
      isRequired: Boolean,
      additionalRequirements: [String]
    },
    parking: {
      available: Boolean,
      information: String,
      fee: Number
    },
    accessibility: {
      wheelchairAccessibile: Boolean,
      assistanceAvailable: Boolean,
      additionalInfo: String
    }
  },

  policies: {
    refund: String,
    cancellation: String,
    photography: String,
    weather: String
  }
}, {
  timestamps: true
});

// Indexes for improved query performance
eventSchema.index({ 'basicInfo.date': 1, 'basicInfo.status': 1 });
eventSchema.index({ 'basicInfo.category': 1 });
eventSchema.index({ 'location.city': 1 });
eventSchema.index({ 'basicInfo.tags': 1 });

// Create text index for search functionality
eventSchema.index({
  'basicInfo.title': 'text',
  'basicInfo.description': 'text',
  'basicInfo.tags': 'text'
});

export const Event = mongoose.model('Event', eventSchema);