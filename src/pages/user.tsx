import { useState } from "react";
import DeliverymanForm from "./Deliveryman";
import VendorForm from "./Vendor";
import hyperloclogo from "/logo.png";
// // Define types for formData and errors
// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   location: string;
//   latitude: number; // Change to number
//   longitude: number; // Change to number
// }

// interface Errors {
//   name?: string;
//   email?: string;
//   phone?: string;
//   location?: string;
// }

// const UserForm = () => {
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     email: "",
//     phone: "",
//     location: "",
//     latitude: 0,
//     longitude: 0,
//   });

//   const apiUrl = import.meta.env.VITE_BACKEND_URL;
//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);

//   // Convert Coordinates to Address
//   const getAddressFromCoords = async (latitude: number, longitude: number) => {
//     try {
//       const response = await fetch(
//         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
//       );
//       const data = await response.json();
//       setFormData((prev) => ({
//         ...prev,
//         location: data.display_name || `${latitude}, ${longitude}`,
//       }));
//     } catch (error) {
//       console.error("Error fetching address:", error);
//       setFormData((prev) => ({
//         ...prev,
//         location: `${latitude}, ${longitude}`,
//       }));
//     }
//   };
//   // Get Current Location
//   const getLocation = () => {
//     if (navigator.geolocation) {
//       setLoading(true);
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData((prev) => ({
//             ...prev,
//             latitude, // This will now store it as a number
//             longitude, // This will now store it as a number
//           }));
//           await getAddressFromCoords(latitude, longitude);
//           setLoading(false);
//         },
//         (error) => {
//           console.error("Error getting location:", error);
//           alert("Unable to retrieve location. Please allow location access.");
//           setLoading(false);
//         }
//       );
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   // Handle Input Change
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Validate Inputs
//   const validateForm = () => {
//     let newErrors: Errors = {};
//     if (!formData.name.trim()) newErrors.name = "Name is required.";
//     if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA0-9.-]+\.[a-zA-Z]{2,}$/))
//       newErrors.email = "Enter a valid email.";
//     if (!formData.phone.match(/^\d{10}$/))
//       newErrors.phone = "Phone must be 10 digits.";
//     if (!formData.location) newErrors.location = "Location is required.";
//     // if (formData.latitude === 0 || formData.longitude === 0)
//     //   newErrors.location = "Get current location.";
//     return newErrors;
//   };

//   // Handle Form Submission
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formErrors = validateForm();
//     setErrors(formErrors);

//     if (Object.keys(formErrors).length === 0) {
//       setSubmitting(true);

//       // No need to parse latitude and longitude, they are already numbers
//       const requestData = {
//         ...formData,
//       };

//       try {
//         const response = await fetch(`${apiUrl}/api/users`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(requestData),
//         });

//         const result = await response.json();
//         if (response.ok) {
//           alert("User registered successfully!");
//           setFormData({
//             name: "",
//             email: "",
//             phone: "",
//             location: "",
//             latitude: 0,
//             longitude: 0,
//           });
//           window.location.href = "https://wa.me/8970972576";
//         } else {
//           alert(`Error: ${result.message}`);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         alert("Something went wrong. Please try again.");
//       }
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
//       <h2 className="text-2xl font-bold text-center mb-4">User Registration</h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
//         </div>

//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border rounded-md"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm">{errors.phone}</p>
//           )}
//         </div>

//         <div className="flex flex-col items-center gap-2">
//           <input
//             type="text"
//             name="location"
//             placeholder="Location"
//             onChange={handleChange}
//             value={formData.location}
//             className="w-full p-2 border rounded-md"
//           />
//           <button
//             type="button"
//             onClick={getLocation}
//             className="p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Fetching..." : "📍 Use Current Location"}
//           </button>
//         </div>
//         {errors.location && (
//           <p className="text-red-500 text-sm">{errors.location}</p>
//         )}

//         <button
//           type="submit"
//           className="w-full bg-[#ec4755] text-white p-2 rounded-md hover:bg-blue-700"
//           disabled={submitting}
//         >
//           {submitting ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// };





const User = () => {
  // const [role, setRole] = useState("");
  const [role, setRole] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center gap-[70px] h-[100vh] w-[100vw]">
      {!role ? (
        <>
          <h1 className="text-4xl flex flex-wrap justify-center align-center text-black font-bold text-center">
            Partner with <p className="text-4xl text-[#ec4755] mx-4 font-bold text-center">
            <img src={hyperloclogo} alt="logo" width={180} height={100} />
            </p>
          </h1>
          <div className="w-[40vw] flex flex-col gap-[30px]">
            {/* <button
              onClick={() => setRole("user")}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white button2 bg-[#ec4755] hover:bg-border hover:text-[#ec4755] md:py-4 md:text-lg md:px-10"
            >
              User
            </button> */}
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
          {/* {role === "user" && <UserForm />} */}
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
