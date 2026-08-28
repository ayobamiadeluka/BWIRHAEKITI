const SUPABASE_URL = "https://cuxtjtocodgjgiuinrkc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FkOn4brrLRWe8In7_6WytQ_g5e_moKJ";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

async function getCurrentUser() {
    const {
        data: { user },
        error
    } = await db.auth.getUser();

    if (error) {
        console.error("Auth error:", error);
        return null;
    }

    return user;
}

async function requireLogin() {

    const user = await getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}

async function logout() {

    const { error } = await db.auth.signOut();

    if (error) {
        console.error("Logout error:", error);
    }

    window.location.href = "index.html";
}

function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
