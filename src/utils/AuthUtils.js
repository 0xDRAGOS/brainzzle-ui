export const handleLogout = (setIsAuthenticated) => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setIsAuthenticated(false);
}

export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
    } catch (error) {
        return false;
    }
};