export const loginUser = async (email, password) => {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  };
  
export const signupUser = async (name, email, password, address) => {
    try {
        const res = await fetch("http://localhost:5000/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, address }),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Signup failed");
        }

        console.log("res", data.user);
        return data; 
    } catch (err) {
        console.error("Signup error:", err);
        throw err;  
    }
};
