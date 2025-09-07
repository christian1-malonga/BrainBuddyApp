export const validateToken = async (token) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      email: data.email,
      name: data.first_name,
      surName: data.last_name,
      studentNumber: data.student_number,
      faculty: data.faculty,
      department: data.department,
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};
