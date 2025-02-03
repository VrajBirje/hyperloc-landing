import React, { useState } from "react";

// Define types for formData and errors
interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  latitude: number; // Change to number
  longitude: number; // Change to number
}

interface Errors {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

const UserForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    latitude: 0,
    longitude: 0,
  });

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Convert Coordinates to Address
  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        location: data.display_name || `${latitude}, ${longitude}`,
      }));
    } catch (error) {
      console.error("Error fetching address:", error);
      setFormData((prev) => ({
        ...prev,
        location: `${latitude}, ${longitude}`,
      }));
    }
  };
  // Get Current Location
  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            latitude, // This will now store it as a number
            longitude, // This will now store it as a number
          }));
          await getAddressFromCoords(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate Inputs
  const validateForm = () => {
    let newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/))
      newErrors.email = "Enter a valid email.";
    if (!formData.phone.match(/^\d{10}$/))
      newErrors.phone = "Phone must be 10 digits.";
    if (!formData.location) newErrors.location = "Location is required.";
    // if (formData.latitude === 0 || formData.longitude === 0)
    //   newErrors.location = "Get current location.";
    return newErrors;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setSubmitting(true);

      // No need to parse latitude and longitude, they are already numbers
      const requestData = {
        ...formData,
      };

      try {
        const response = await fetch(`${apiUrl}/api/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        });

        const result = await response.json();
        if (response.ok) {
          alert("User registered successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            location: "",
            latitude: 0,
            longitude: 0,
          });
          window.location.href = "https://wa.me/8970972576";
        } else {
          alert(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">User Registration</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            name="location"
            placeholder="Location"
            onChange={handleChange}
            value={formData.location}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={getLocation}
            className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Fetching..." : "📍 Use Current Location"}
          </button>
        </div>
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#ec4755] text-white p-2 rounded-md hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

const VendorForm = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  console.log(apiUrl)
  // Get location from geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getAddressFromCoords(latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.display_name) {
        setLocation(data.display_name);
      } else {
        setLocation(`${latitude}, ${longitude}`);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setLocation(`${latitude}, ${longitude}`);
    }
  };

  // Validate form fields
  const validateForm = () => {
    if (
      !businessName ||
      !businessType ||
      !phone ||
      !email ||
      !location 
    ) {
      setError("All fields are required");
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      setError("Phone number must be numeric");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email format is invalid");
      return false;
    }
    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate before submitting

    const vendorData = {
      business_name: businessName,
      business_type: businessType,
      phone: phone,
      email: email,
      location: location,
      latitude: latitude!,
      longitude: longitude!,
    };

    try {
      const response = await fetch(`${apiUrl}/api/vendors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendorData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Vendor registered successfully");
        // You can reset the form or redirect to another page
        window.location.href = "https://wa.me/8970972576";
      } else {
        setError(data.message || "Error registering vendor");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Vendor Registration
      </h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Business Name"
          className="w-full p-2 border rounded-md"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <select
          name="business_type"
          className="w-full p-2 border rounded-md"
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
        >
          <option value="" disabled>
            Select a business type
          </option>
          <option value="villa-stay">Villa Stay</option>
          <option value="home-stay">Home Stay</option>
          <option value="service-apartments">Service Apartments</option>
          <option value="luxury-stay">Luxury Stay</option>
          <option value="hotel-restaurant">Hotel/Restaurant</option>
          <option value="restro-pub">Restro Pub</option>
          <option value="cafes">Cafes</option>
          <option value="adventure-activities">Adventure Activities</option>
          <option value="trekking">Trekking</option>
          <option value="bike-car-rentals">Bike / Car Rentals</option>
          <option value="workshops">Workshops</option>
          <option value="taxi">Taxi</option>
          <option value="shopping">Shopping</option>
        </select>
        <input
          type="email"
          placeholder="Business Email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Business Phone no."
          className="w-full p-2 border rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {/* Location Input Field */}
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={getLocation}
            className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Fetching..." : "📍 Use Current Location"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-[#ec4755] text-white p-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const DeliverymanForm = () => {
  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  // Get location from geolocation API
  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getAddressFromCoords(latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getAddressFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();
      if (data.display_name) {
        setLocation(data.display_name);
      } else {
        setLocation(`${latitude}, ${longitude}`);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setLocation(`${latitude}, ${longitude}`);
    }
  };

  // Validate form fields
  const validateForm = () => {
    if (!name || !phone || !email || !location ) {
      setError("All fields are required");
      return false;
    }
    if (!/^\d+$/.test(phone)) {
      setError("Phone number must be numeric");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email format is invalid");
      return false;
    }
    setError("");
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return; // Validate before submitting

    const deliverymanData = {
      name,
      phone,
      email,
      location,
      latitude: latitude!,
      longitude: longitude!,
    };

    try {
      const response = await fetch(`${apiUrl}/api/deliverymen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deliverymanData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Deliveryman registered successfully");
        window.location.href = "https://wa.me/8970972576";
        // You can reset the form or redirect to another page
      } else {
        setError(data.message || "Error registering deliveryman");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Deliveryman Registration
      </h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Phone"
          className="w-full p-2 border rounded-md"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Location Input Field */}
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={getLocation}
            className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Fetching..." : "📍 Use Current Location"}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-[#ec4755] text-white p-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const User = () => {
  // const [role, setRole] = useState("");
  const [role, setRole] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-[70px] h-[100vh] w-[100vw]">
      {!role ? (
        <>
          <h1 className="text-4xl flex flex-wrap justify-center align-center text-black font-bold text-center">
            Continue to <p className="text-4xl text-[#ec4755] mx-4 font-bold text-center">Hyperloc</p> as
          </h1>
          <div className="w-[40vw] flex flex-col gap-[30px]">
            <button
              onClick={() => setRole("user")}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white button2 bg-[#ec4755] hover:bg-border hover:text-[#ec4755] md:py-4 md:text-lg md:px-10"
            >
              User
            </button>
            <button
              onClick={() => setRole("vendor")}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white button2 bg-[#ec4755] hover:bg-border hover:text-[#ec4755] md:py-4 md:text-lg md:px-10"
            >
              Vendor
            </button>
            <button
              onClick={() => setRole("deliveryman")}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white button2 bg-[#ec4755] hover:bg-border hover:text-[#ec4755] md:py-4 md:text-lg md:px-10"
            >
              Deliveryman
            </button>
          </div>
        </>
      ) : (
        <>
          {role === "user" && <UserForm />}
          {role === "vendor" && <VendorForm />}
          {role === "deliveryman" && <DeliverymanForm />}
          <button
            onClick={() => setRole(null)}
            className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default User;
