export const generateMemeComment = () => {
    const phrases = [
        'А вот и свежий мем!)',
        'Я нашел для вас лучший мем',
        'Этот не так хорош, как предыдущий, но тоже не плох))',
        'Я знаю, вы ждали этого:)',
        'Вы хорошо себя вели и заслужили еще один мем)',
        'Сори, но мне показался смешным',
        'АХАХАХАХХАХАХА',
        'Чет я уссался с этого!)!))0',
        // `Ахаха это ж про тебя ${client.guild.members.random()}`,
    ]
    return phrases[Math.floor(Math.random() * phrases.length)];
}