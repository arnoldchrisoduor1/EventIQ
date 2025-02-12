const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    // Basic Event info
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
        type:String,
        required: true,
        enum: ['draft', 'published', 'cancelled', 'postponed', 'completed'],
        default: 'draft'
    },


    // ======= MEDIA AND FILES =============
    banner: {
        type: String,
        required: true
    },
    files: [{
        name: String,
        url: String,
        type: String
    }],

    // ====== DATE AND TIME =================
    date: {
        type: Date,
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
    setupTime: Date,
    teardownTime: Date,


    // =========== LOCATION ===========
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

    // ======= CAPACITY AND RESTRICTIONS =====
    capacity: {
        type: Number,
        required: true
    },
    ageRestriction: {
        minimum: Number,
        maximum: Number,
    },

    organizer: {
        name: {
            type: String,
            required: true
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

    // ========= Scheduele and program ==========
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

    // ============= PRICING TIERS =============
    ticketTiers: [{
        name: String,
        price: Number,
        quantity: Number,
        description: String,
        earlyBirdDeadline: Date,
        earlyBirdPrice: Number
    }],

    // ======== ADDITIONAL INFORMATION ===========
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
    },

    // ======== POLICIES =============
    policies: {
        refund: String,
        cancellation: String,
        photography: String,
        weather: String
    },

    // ========= Metadata ================
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for improved query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ 'location.city': 1 });
eventSchema.index({ tags: 1 });

// Create text index for search functionality
eventSchema.index({
  title: 'text',
  description: 'text',
  tags: 'text'
});


export const Event = mongoose.model('Event', eventSchema);