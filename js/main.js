document.addEventListener('DOMContentLoaded', () => {
    const range = document.querySelector('.generator__range input[type="range"]');
    const passwordInput = document.querySelector('#password');
    const lengthValue = document.querySelector('.generator__length span');
    const generateBtn = document.querySelector('.generator__btn');
    const copyBtn = document.querySelector('.generator__copy');
    if (!range) return;

    const update = () => {
        const min = Number(range.min || 0);
        const max = Number(range.max || 100);
        const val = Number(range.value);
        const p = ((val - min) / (max - min)) * 100;

        range.style.setProperty('--p', `${p}%`);
    };

    range.addEventListener('input', update);
    update();

    const checkboxes = Array.from(
        document.querySelectorAll('.generator__checkbox input[type="checkbox"]')
    );

    const strengthEl = document.querySelector('.generator__strength');
    const strengthValue = document.querySelector('.generator__strength-value');
    const bars = Array.from(document.querySelectorAll('.generator__bar span'));

    range.min = '0';
    range.max = '20';

    const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWER = 'abcdefghijklmnopqrstuvwxyz';
    const NUM = '0123456789';
    const SYM = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    function getSelectedPools() {
        const pools = [];
        if (checkboxes[0]?.checked) pools.push(UPPER);
        if (checkboxes[1]?.checked) pools.push(LOWER);
        if (checkboxes[2]?.checked) pools.push(NUM);
        if (checkboxes[3]?.checked) pools.push(SYM);
        return pools;
    }

    function isValidForGenerate() {
        const len = Number(range.value);
        const poolsCount = getSelectedPools().length;
        return len > 0 && poolsCount > 0;
    }

    function updateGenerateButton() {
        if (!generateBtn) return;
        generateBtn.disabled = !isValidForGenerate();
    }

    function updateStrength() {
        const activeCount = getSelectedPools().length;

        bars.forEach((bar, i) => {
            bar.classList.toggle('is-active', i < activeCount);
        });

        if (!strengthEl) return;

        if (activeCount === 1) {
            strengthEl.dataset.level = 'too-weak';
            if (strengthValue) strengthValue.textContent = 'TOO WEAK!';
            return;
        }

        if (activeCount === 2) {
            strengthEl.dataset.level = 'weak';
            if (strengthValue) strengthValue.textContent = 'WEAK';
            return;
        }

        if (activeCount === 3) {
            strengthEl.dataset.level = 'medium';
            if (strengthValue) strengthValue.textContent = 'MEDIUM';
            return;
        }

        if (activeCount === 4) {
            strengthEl.dataset.level = 'strong';
            if (strengthValue) strengthValue.textContent = 'STRONG';
            return;
        }

        strengthEl.dataset.level = '';
        if (strengthValue) strengthValue.textContent = '';
    }

    function updateLengthUI() {
        if (lengthValue) lengthValue.textContent = range.value;
    }

    function randInt(max) {
        return Math.floor(Math.random() * max);
    }

    function pick(pool) {
        return pool[randInt(pool.length)];
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = randInt(i + 1);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function generatePassword(len, pools) {
        if (len === 0) return '';
        if (pools.length === 0) return '';

        const all = pools.join('');
        const result = [];

        const guaranteed = Math.min(len, pools.length);
        for (let i = 0; i < guaranteed; i++) {
            result.push(pick(pools[i]));
        }

        for (let i = guaranteed; i < len; i++) {
            result.push(pick(all));
        }

        return shuffle(result).join('');
    }

    function onGenerate() {
        if (!isValidForGenerate()) return;

        const len = Number(range.value);
        const pools = getSelectedPools();

        const pwd = generatePassword(len, pools);
        passwordInput.value = pwd;
    }

    range.addEventListener('input', () => {
        update();
        updateLengthUI();
        updateGenerateButton();
    });

    checkboxes.forEach((cb) => {
        cb.addEventListener('change', () => {
            updateStrength();
            updateGenerateButton();
        });
    });

    generateBtn.addEventListener('click', (e) => {
        e.preventDefault();
        onGenerate();
    });

    copyBtn.addEventListener('click', async () => {
        const text = passwordInput.value || '';
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
        } catch {
            passwordInput.focus();
            passwordInput.select();
            document.execCommand('copy');
            window.getSelection()?.removeAllRanges();
        }
    });

    updateLengthUI();
    updateStrength();
    updateGenerateButton();
});