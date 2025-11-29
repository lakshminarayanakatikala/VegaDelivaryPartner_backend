const { string } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const RiderSchema = new Schema(
  {
    /* =====================================================
     PHONE & LOGIN
    ===================================================== */

    phone: {
      countryCode: { type: String, default: "+91" },
      number: { type: String, required: true },
      isVerified: { type: Boolean, default: false },
    },

    lastOtpVerifiedAt: Date,

    isFullyRegistered: { type: Boolean, default: false },

    /* =====================================================
     ONBOARDING STAGE MANAGER
    ===================================================== */

    onboardingStage: {
      type: String,
      enum: [
        "PHONE_VERIFICATION",
        "APP_PERMISSIONS",
        "SELECT_LOCATION",
        "SELECT_VEHICLE",
        "PERSONAL_INFO",
        "SELFIE",
        "AADHAAR",
        "PAN_UPLOAD",
        "DL_UPLOAD",
        "KYC_SUBMITTED",
        "KYC_APPROVED",
        "COMPLETED",
      ],
      default: "PHONE_VERIFICATION",
    },

    onboardingProgress: {
      phoneVerified: { type: Boolean, default: false },
      appPermissionDone: { type: Boolean, default: false },
      citySelected: { type: Boolean, default: false },
      vehicleSelected: { type: Boolean, default: false },
      personalInfoSubmitted: { type: Boolean, default: false },
      selfieUploaded: { type: Boolean, default: false },
      aadharVerified: { type: Boolean, default: false },
      panUploaded: { type: Boolean, default: false },
      dlUploaded: { type: Boolean, default: false },
    },

    /* =====================================================
     PERSONAL INFO
    ===================================================== */

    personalInfo: {
      fullName: { type: String, required: true },
      dob: { type: Date },
      gender: { type: String, enum: ["male", "female", "other"] },
      primaryPhone: { type: String, required: true },
      secondaryPhone: { type: String },
      email: { type: String }
    },

    /* =====================================================
     LOCATION INFO
    ===================================================== */
    // city: { type: String, required: true },
    // area: { type: String, required: true },
    location: {
      type:String  
    //   city: { type: String, required: true },
    //   area: { type: String, required: true },
    //   landmark: { type: String }, // optional extra
    //   pincode: { type: String },

      // Optional: helps for zone assignment & GPS accuracy
    //   coordinates: {
    //     lat: { type: Number },
    //     lng: { type: Number },
    //   },
    },

    /* =====================================================
     VEHICLE INFORMATION
    ===================================================== */
    vehicleInfo: {
      type: { type: String, enum: ["ev", "bike", "scooty"], required: true }
    },

    /* =====================================================
     SELFIE
    ===================================================== */
    selfie: {
      url: { type: String },
      uploadedAt: { type: Date },
    },

    /* =====================================================
     KYC DOCUMENTS (SAFE — NO aadhaar number stored)
    ===================================================== */
    kyc: {
      aadhar: {
        // Aadhaar NUMBER SHOULD NOT BE STORED
        isVerified: { type: Boolean, default: false },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        rejectionReason: String,
      },

      pan: {
        image: { type: String },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        rejectionReason: String,
      },

      drivingLicense: {
        frontImage: { type: String },
        backImage: { type: String },
        status: {
          type: String,
          enum: ["pending", "approved", "rejected"],
          default: "pending",
        },
        rejectionReason: String,
      },
    },

    status: {
      type: String,
      enum: ["pending", "actived", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Rider", RiderSchema);
