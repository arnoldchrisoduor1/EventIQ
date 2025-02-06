const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    // Reference to the event
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },

    // Ticket ownership
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Original purchaser (for tracking transfers)
    originalPurchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    // Ticket details
    ticketType: {
        type: String,
        required: true,
        enum: ['general', 'vip', 'early-bird', 'student']
    },

    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },

    // Unique identifier for the ticket
    ticketNumber: {
        type: String,
        unique: true,
        required: true
    },

    // QR code data
    qrCode: {
        data: String,  // Encrypted data for the QR code
        generatedAt: Date
    },

    // Status tracking
    status: {
        type: String,
        enum: ['active', 'used', 'transferred', 'cancelled', 'expired'],
        default: 'active'
    },

    // Entry tracking
    entryStatus: {
        hasEntered: {
            type: Boolean,
            default: false
        },
        entryTime: Date,
        entryLocation: String
    },

    // Transfer history
    transferHistory: [{
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        transferredAt: {
            type: Date,
            default: Date.now
        },
        transferReason: String
    }],

    // For limited transfer tickets
    transferCount: {
        type: Number,
        default: 0
    },
    maxTransfers: {
        type: Number,
        default: 3  // Limit number of transfers
    },

    // Additional features
    isRefundable: {
        type: Boolean,
        default: true
    },
    
    specialInstructions: String,
    
    // Virtual seat/section assignment if applicable
    seatAssignment: {
        section: String,
        row: String,
        seatNumber: String
    }
}, {
    timestamps: true
});

// Indexes
ticketSchema.index({ event: 1, status: 1 });
ticketSchema.index({ ticketNumber: 1 }, { unique: true });
ticketSchema.index({ owner: 1 });

// Virtual field for QR code URL
ticketSchema.virtual('qrCodeUrl').get(function() {
    return `/api/tickets/${this._id}/qr`;
});

// Method to check if ticket can be transferred
ticketSchema.methods.canBeTransferred = function() {
    return this.status === 'active' && 
           this.transferCount < this.maxTransfers &&
           !this.entryStatus.hasEntered;
};

// Method to validate ticket for entry
ticketSchema.methods.validateForEntry = function() {
    return this.status === 'active' && !this.entryStatus.hasEntered;
};


export const Ticket = mongoose.model('Ticket', ticketSchema);