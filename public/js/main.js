async function checkAuth() {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;
    if (!token && currentPath !== '/login' && currentPath !== '/register')
        return window.location.href = '/login';

    try {
        const res = await fetch('/api/auth/check', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Kullanıcı doğrulandı:', data.user);
            if (currentPath === '/login' || currentPath === '/register')
                return window.location.href = '/';
            //*kullanıcı bilgileri sayfada gösterilcek.
            document.getElementById('username').innerText = data.user.id;
        } else {
            console.warn('Token geçersiz, giriş sayfasına yönlendiriliyor.');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    } catch (err) {
        console.log('Auth kontrol hatası:', err);
        window.location.href = '/login';
    }
}

document.addEventListener('DOMContentLoaded', checkAuth);