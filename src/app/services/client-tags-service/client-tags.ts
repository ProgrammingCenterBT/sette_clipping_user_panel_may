export class ClientTags {
    client_tag_id: number
    tags: {
            tag_id: number,
            tag_name_c: string,
            tag_name_l: string,
            tag_color: string,
            parent_tag: true,
            parent_tag_id: number,
            tags_category: {
                tags_category_id: number,
                tags_category_name: string
            }
    }
    clients: {
            client_id: number,
            client_name: string,
            client_username: string,
            client_password: string,
            client_email: string,
            client_bcc: string,
            mail_title: string,
            pdf_title: string,
            pdf_detail: string,
            custom_message: string,
            follows_clips: boolean,
            follows_analytics: boolean,
            follows_tenders: boolean,
            follows_bankruptcies: boolean,
            follows_notifications: boolean,
            follows_sales: boolean,
            is_latin: boolean,
            is_trial: boolean,
            is_tags: boolean
    }
}