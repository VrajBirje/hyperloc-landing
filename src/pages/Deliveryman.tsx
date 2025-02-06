import React, { useState } from "react";

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
        if (!name || !phone || !email || !location) {
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
        <div className="w-full h-[100vh] flex justify-center items-center">
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
        </div>
    );
};

export default DeliverymanForm;