"use server"

export const registerUser = async (formData: FormData) => {
  try {
    const res = await fetch("http://localhost:5000/api/v1/user/create-user", {
      method: "POST",
      body: formData, 
    });

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return { success: false, message: "Registration failed" };
  }
};
