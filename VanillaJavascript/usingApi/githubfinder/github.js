class GitHub {
    constructor() {
        this.client_id = '9a55b309a0c56b41dea0';
        this.client_secret = '83748e2568a461771ed3c71cea56cc1480e5afe3';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id = ${this.client_id}&client_secret=${this.client_secret}`);
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id = ${this.client_id}&client_secret=${this.client_secret}`);
        
        const profile = await profileResponse.json();

        const repos = await reposResponse.json();

        return {
            profile,
            repos
        };
    }

}