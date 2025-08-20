-- Seed data for LinkedIn Post Generation System

-- Insert default style templates
INSERT INTO style_templates (name, description, tone, structure_pattern, hashtag_strategy, target_engagement) VALUES
('Professional Insight', 'Thought leadership posts with industry insights', 'professional', 'Hook + Insight + Call to Action', 'industry_specific', 'high_engagement'),
('Personal Story', 'Narrative-driven posts sharing personal experiences', 'personal', 'Story + Lesson + Question', 'broad_appeal', 'medium_engagement'),
('Quick Tip', 'Short, actionable advice posts', 'helpful', 'Problem + Solution + CTA', 'niche_specific', 'high_engagement'),
('Industry News', 'Commentary on current industry trends', 'analytical', 'News + Analysis + Opinion', 'trending_topics', 'medium_engagement'),
('Behind the Scenes', 'Authentic glimpses into work life', 'casual', 'Context + Story + Reflection', 'lifestyle_work', 'medium_engagement');

-- Insert content topics
INSERT INTO content_topics (name, description, keywords, target_audience, engagement_potential) VALUES
('AI & Technology', 'Posts about artificial intelligence and tech trends', ARRAY['AI', 'technology', 'innovation', 'automation'], 'tech professionals', 8),
('Leadership', 'Content about management and leadership skills', ARRAY['leadership', 'management', 'team building', 'culture'], 'managers and executives', 7),
('Career Development', 'Professional growth and career advice', ARRAY['career', 'growth', 'skills', 'networking'], 'professionals at all levels', 9),
('Entrepreneurship', 'Startup and business building content', ARRAY['startup', 'entrepreneur', 'business', 'innovation'], 'entrepreneurs and founders', 8),
('Work-Life Balance', 'Content about productivity and wellness', ARRAY['productivity', 'wellness', 'balance', 'mental health'], 'working professionals', 7),
('Industry Insights', 'Sector-specific analysis and trends', ARRAY['trends', 'analysis', 'market', 'industry'], 'industry professionals', 6);

-- Insert default user settings
INSERT INTO user_settings (setting_key, setting_value, description) VALUES
('posting_schedule', '{"days": ["monday", "wednesday", "friday"], "time": "09:00", "timezone": "UTC"}', 'Default posting schedule'),
('content_preferences', '{"tone": "professional", "length": "medium", "hashtag_count": 5}', 'Content generation preferences'),
('analytics_tracking', '{"track_engagement": true, "track_clicks": true, "report_frequency": "weekly"}', 'Analytics and reporting settings'),
('ai_model_settings', '{"model": "gpt-4", "creativity": 0.7, "style_consistency": 0.8}', 'AI model configuration');
