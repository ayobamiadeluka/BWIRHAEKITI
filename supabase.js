const SUPABASE_URL = "https://cuxtjtocodgjgiuinrkc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FkOn4brrLRWe8In7_6WytQ_g5e_moKJ";

const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

async function getCurrentUser() {
    const { data, error } = await db.auth.getUser();

    if (error) {
        console.error(error);
        return null;
    }

    return data.user || null;
}

async function requireLogin() {
    const user = await getCurrentUser();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}

async function isAdmin() {
    const user = await getCurrentUser();

    if (!user) return false;

    const { data, error } = await db
        .from("admins")
        .select("*")
        .eq("user_id", user.id)
        .eq("active", true)
        .maybeSingle();

    if (error) {
        console.error("Admin check:", error);
        return false;
    }

    return !!data;
}

async function logout() {
    await db.auth.signOut();
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
