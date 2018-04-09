export class AppSettings {
    // Client side App URLS
    // the / is not included in these urls because
    // the angular router module doesn't user the first slash
    // but when using navigateByUrl a slash must be added to the front
    public static CLIENT_NEWS_URL = 'news';
    public static CLIENT_ADMIN_URL = 'admin';
    public static CLIENT_ADMIN_LOGIN_URL = 'admin/login';
    // API endpoints
    public static ADMIN_LOGIN_URL = '/api/auth/login';
    public static ADMIN_REGISTER_URL = '/api/auth/register';
}
