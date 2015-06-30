glMatrixArrayType = typeof Float32Array != "undefined" ? Float32Array: typeof WebGLFloatArray != "undefined" ? WebGLFloatArray: Array;
var vec3 = {};
vec3.create = function (a) {
	var b = new glMatrixArrayType(3);
	if (a) {
		b[0] = a[0];
		b[1] = a[1];
		b[2] = a[2]
	}
	return b
};
vec3.set = function (a, b) {
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	return b
};
vec3.add = function (a, b, c) {
	if (!c || a == c) {
		a[0] += b[0];
		a[1] += b[1];
		a[2] += b[2];
		return a
	}
	c[0] = a[0] + b[0];
	c[1] = a[1] + b[1];
	c[2] = a[2] + b[2];
	return c
};
vec3.subtract = function (a, b, c) {
	if (!c || a == c) {
		a[0] -= b[0];
		a[1] -= b[1];
		a[2] -= b[2];
		return a
	}
	c[0] = a[0] - b[0];
	c[1] = a[1] - b[1];
	c[2] = a[2] - b[2];
	return c
};
vec3.negate = function (a, b) {
	b || (b = a);
	b[0] = -a[0];
	b[1] = -a[1];
	b[2] = -a[2];
	return b
};
vec3.scale = function (a, b, c) {
	if (!c || a == c) {
		a[0] *= b;
		a[1] *= b;
		a[2] *= b;
		return a
	}
	c[0] = a[0] * b;
	c[1] = a[1] * b;
	c[2] = a[2] * b;
	return c
};
vec3.normalize = function (a, b) {
	b || (b = a);
	var c = a[0],
	d = a[1],
	e = a[2],
	g = Math.sqrt(c * c + d * d + e * e);
	if (g) {
		if (g == 1) {
			b[0] = c;
			b[1] = d;
			b[2] = e;
			return b
		}
	} else {
		b[0] = 0;
		b[1] = 0;
		b[2] = 0;
		return b
	}
	g = 1 / g;
	b[0] = c * g;
	b[1] = d * g;
	b[2] = e * g;
	return b
};
vec3.cross = function (a, b, c) {
	c || (c = a);
	var d = a[0],
	e = a[1];
	a = a[2];
	var g = b[0],
	f = b[1];
	b = b[2];
	c[0] = e * b - a * f;
	c[1] = a * g - d * b;
	c[2] = d * f - e * g;
	return c
};
vec3.length = function (a) {
	var b = a[0],
	c = a[1];
	a = a[2];
	return Math.sqrt(b * b + c * c + a * a)
};
vec3.dot = function (a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
};
vec3.direction = function (a, b, c) {
	c || (c = a);
	var d = a[0] - b[0],
	e = a[1] - b[1];
	a = a[2] - b[2];
	b = Math.sqrt(d * d + e * e + a * a);
	if (!b) {
		c[0] = 0;
		c[1] = 0;
		c[2] = 0;
		return c
	}
	b = 1 / b;
	c[0] = d * b;
	c[1] = e * b;
	c[2] = a * b;
	return c
};
vec3.lerp = function (a, b, c, d) {
	d || (d = a);
	d[0] = a[0] + c * (b[0] - a[0]);
	d[1] = a[1] + c * (b[1] - a[1]);
	d[2] = a[2] + c * (b[2] - a[2]);
	return d
};
vec3.str = function (a) {
	return "[" + a[0] + ", " + a[1] + ", " + a[2] + "]"
};
var mat3 = {};
mat3.create = function (a) {
	var b = new glMatrixArrayType(9);
	if (a) {
		b[0] = a[0];
		b[1] = a[1];
		b[2] = a[2];
		b[3] = a[3];
		b[4] = a[4];
		b[5] = a[5];
		b[6] = a[6];
		b[7] = a[7];
		b[8] = a[8];
		b[9] = a[9]
	}
	return b
};
mat3.set = function (a, b) {
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	b[3] = a[3];
	b[4] = a[4];
	b[5] = a[5];
	b[6] = a[6];
	b[7] = a[7];
	b[8] = a[8];
	return b
};
mat3.identity = function (a) {
	a[0] = 1;
	a[1] = 0;
	a[2] = 0;
	a[3] = 0;
	a[4] = 1;
	a[5] = 0;
	a[6] = 0;
	a[7] = 0;
	a[8] = 1;
	return a
};
mat3.transpose = function (a, b) {
	if (!b || a == b) {
		var c = a[1],
		d = a[2],
		e = a[5];
		a[1] = a[3];
		a[2] = a[6];
		a[3] = c;
		a[5] = a[7];
		a[6] = d;
		a[7] = e;
		return a
	}
	b[0] = a[0];
	b[1] = a[3];
	b[2] = a[6];
	b[3] = a[1];
	b[4] = a[4];
	b[5] = a[7];
	b[6] = a[2];
	b[7] = a[5];
	b[8] = a[8];
	return b
};
mat3.toMat4 = function (a, b) {
	b || (b = mat4.create());
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	b[3] = 0;
	b[4] = a[3];
	b[5] = a[4];
	b[6] = a[5];
	b[7] = 0;
	b[8] = a[6];
	b[9] = a[7];
	b[10] = a[8];
	b[11] = 0;
	b[12] = 0;
	b[13] = 0;
	b[14] = 0;
	b[15] = 1;
	return b
};
mat3.str = function (a) {
	return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + "]"
};
var mat4 = {};
mat4.create = function (a) {
	var b = new glMatrixArrayType(16);
	if (a) {
		b[0] = a[0];
		b[1] = a[1];
		b[2] = a[2];
		b[3] = a[3];
		b[4] = a[4];
		b[5] = a[5];
		b[6] = a[6];
		b[7] = a[7];
		b[8] = a[8];
		b[9] = a[9];
		b[10] = a[10];
		b[11] = a[11];
		b[12] = a[12];
		b[13] = a[13];
		b[14] = a[14];
		b[15] = a[15]
	}
	return b
};
mat4.set = function (a, b) {
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	b[3] = a[3];
	b[4] = a[4];
	b[5] = a[5];
	b[6] = a[6];
	b[7] = a[7];
	b[8] = a[8];
	b[9] = a[9];
	b[10] = a[10];
	b[11] = a[11];
	b[12] = a[12];
	b[13] = a[13];
	b[14] = a[14];
	b[15] = a[15];
	return b
};
mat4.identity = function (a) {
	a[0] = 1;
	a[1] = 0;
	a[2] = 0;
	a[3] = 0;
	a[4] = 0;
	a[5] = 1;
	a[6] = 0;
	a[7] = 0;
	a[8] = 0;
	a[9] = 0;
	a[10] = 1;
	a[11] = 0;
	a[12] = 0;
	a[13] = 0;
	a[14] = 0;
	a[15] = 1;
	return a
};
mat4.transpose = function (a, b) {
	if (!b || a == b) {
		var c = a[1],
		d = a[2],
		e = a[3],
		g = a[6],
		f = a[7],
		h = a[11];
		a[1] = a[4];
		a[2] = a[8];
		a[3] = a[12];
		a[4] = c;
		a[6] = a[9];
		a[7] = a[13];
		a[8] = d;
		a[9] = g;
		a[11] = a[14];
		a[12] = e;
		a[13] = f;
		a[14] = h;
		return a
	}
	b[0] = a[0];
	b[1] = a[4];
	b[2] = a[8];
	b[3] = a[12];
	b[4] = a[1];
	b[5] = a[5];
	b[6] = a[9];
	b[7] = a[13];
	b[8] = a[2];
	b[9] = a[6];
	b[10] = a[10];
	b[11] = a[14];
	b[12] = a[3];
	b[13] = a[7];
	b[14] = a[11];
	b[15] = a[15];
	return b
};
mat4.determinant = function (a) {
	var b = a[0],
	c = a[1],
	d = a[2],
	e = a[3],
	g = a[4],
	f = a[5],
	h = a[6],
	i = a[7],
	j = a[8],
	k = a[9],
	l = a[10],
	o = a[11],
	m = a[12],
	n = a[13],
	p = a[14];
	a = a[15];
	return m * k * h * e - j * n * h * e - m * f * l * e + g * n * l * e + j * f * p * e - g * k * p * e - m * k * d * i + j * n * d * i + m * c * l * i - b * n * l * i - j * c * p * i + b * k * p * i + m * f * d * o - g * n * d * o - m * c * h * o + b * n * h * o + g * c * p * o - b * f * p * o - j * f * d * a + g * k * d * a + j * c * h * a - b * k * h * a - g * c * l * a + b * f * l * a
};
mat4.inverse = function (a, b) {
	b || (b = a);
	var c = a[0],
	d = a[1],
	e = a[2],
	g = a[3],
	f = a[4],
	h = a[5],
	i = a[6],
	j = a[7],
	k = a[8],
	l = a[9],
	o = a[10],
	m = a[11],
	n = a[12],
	p = a[13],
	r = a[14],
	s = a[15],
	A = c * h - d * f,
	B = c * i - e * f,
	t = c * j - g * f,
	u = d * i - e * h,
	v = d * j - g * h,
	w = e * j - g * i,
	x = k * p - l * n,
	y = k * r - o * n,
	z = k * s - m * n,
	C = l * r - o * p,
	D = l * s - m * p,
	E = o * s - m * r,
	q = 1 / (A * E - B * D + t * C + u * z - v * y + w * x);
	b[0] = (h * E - i * D + j * C) * q;
	b[1] = ( - d * E + e * D - g * C) * q;
	b[2] = (p * w - r * v + s * u) * q;
	b[3] = ( - l * w + o * v - m * u) * q;
	b[4] = ( - f * E + i * z - j * y) * q;
	b[5] = (c * E - e * z + g * y) * q;
	b[6] = ( - n * w + r * t - s * B) * q;
	b[7] = (k * w - o * t + m * B) * q;
	b[8] = (f * D - h * z + j * x) * q;
	b[9] = ( - c * D + d * z - g * x) * q;
	b[10] = (n * v - p * t + s * A) * q;
	b[11] = ( - k * v + l * t - m * A) * q;
	b[12] = ( - f * C + h * y - i * x) * q;
	b[13] = (c * C - d * y + e * x) * q;
	b[14] = ( - n * u + p * B - r * A) * q;
	b[15] = (k * u - l * B + o * A) * q;
	return b
};
mat4.toRotationMat = function (a, b) {
	b || (b = mat4.create());
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	b[3] = a[3];
	b[4] = a[4];
	b[5] = a[5];
	b[6] = a[6];
	b[7] = a[7];
	b[8] = a[8];
	b[9] = a[9];
	b[10] = a[10];
	b[11] = a[11];
	b[12] = 0;
	b[13] = 0;
	b[14] = 0;
	b[15] = 1;
	return b
};
mat4.toMat3 = function (a, b) {
	b || (b = mat3.create());
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	b[3] = a[4];
	b[4] = a[5];
	b[5] = a[6];
	b[6] = a[8];
	b[7] = a[9];
	b[8] = a[10];
	return b
};
mat4.toInverseMat3 = function (a, b) {
	var c = a[0],
	d = a[1],
	e = a[2],
	g = a[4],
	f = a[5],
	h = a[6],
	i = a[8],
	j = a[9],
	k = a[10],
	l = k * f - h * j,
	o = -k * g + h * i,
	m = j * g - f * i,
	n = c * l + d * o + e * m;
	if (!n) return null;
	n = 1 / n;
	b || (b = mat3.create());
	b[0] = l * n;
	b[1] = ( - k * d + e * j) * n;
	b[2] = (h * d - e * f) * n;
	b[3] = o * n;
	b[4] = (k * c - e * i) * n;
	b[5] = ( - h * c + e * g) * n;
	b[6] = m * n;
	b[7] = ( - j * c + d * i) * n;
	b[8] = (f * c - d * g) * n;
	return b
};
mat4.multiply = function (a, b, c) {
	c || (c = a);
	var d = a[0],
	e = a[1],
	g = a[2],
	f = a[3],
	h = a[4],
	i = a[5],
	j = a[6],
	k = a[7],
	l = a[8],
	o = a[9],
	m = a[10],
	n = a[11],
	p = a[12],
	r = a[13],
	s = a[14];
	a = a[15];
	var A = b[0],
	B = b[1],
	t = b[2],
	u = b[3],
	v = b[4],
	w = b[5],
	x = b[6],
	y = b[7],
	z = b[8],
	C = b[9],
	D = b[10],
	E = b[11],
	q = b[12],
	F = b[13],
	G = b[14];
	b = b[15];
	c[0] = A * d + B * h + t * l + u * p;
	c[1] = A * e + B * i + t * o + u * r;
	c[2] = A * g + B * j + t * m + u * s;
	c[3] = A * f + B * k + t * n + u * a;
	c[4] = v * d + w * h + x * l + y * p;
	c[5] = v * e + w * i + x * o + y * r;
	c[6] = v * g + w * j + x * m + y * s;
	c[7] = v * f + w * k + x * n + y * a;
	c[8] = z * d + C * h + D * l + E * p;
	c[9] = z * e + C * i + D * o + E * r;
	c[10] = z * g + C * j + D * m + E * s;
	c[11] = z * f + C * k + D * n + E * a;
	c[12] = q * d + F * h + G * l + b * p;
	c[13] = q * e + F * i + G * o + b * r;
	c[14] = q * g + F * j + G * m + b * s;
	c[15] = q * f + F * k + G * n + b * a;
	return c
};
mat4.multiplyVec3 = function (a, b, c) {
	c || (c = b);
	var d = b[0],
	e = b[1];
	b = b[2];
	c[0] = a[0] * d + a[4] * e + a[8] * b + a[12];
	c[1] = a[1] * d + a[5] * e + a[9] * b + a[13];
	c[2] = a[2] * d + a[6] * e + a[10] * b + a[14];
	return c
};
mat4.multiplyVec4 = function (a, b, c) {
	c || (c = b);
	var d = b[0],
	e = b[1],
	g = b[2];
	b = b[3];
	c[0] = a[0] * d + a[4] * e + a[8] * g + a[12] * b;
	c[1] = a[1] * d + a[5] * e + a[9] * g + a[13] * b;
	c[2] = a[2] * d + a[6] * e + a[10] * g + a[14] * b;
	c[3] = a[3] * d + a[7] * e + a[11] * g + a[15] * b;
	return c
};
mat4.translate = function (a, b, c) {
	var d = b[0],
	e = b[1];
	b = b[2];
	if (!c || a == c) {
		a[12] = a[0] * d + a[4] * e + a[8] * b + a[12];
		a[13] = a[1] * d + a[5] * e + a[9] * b + a[13];
		a[14] = a[2] * d + a[6] * e + a[10] * b + a[14];
		a[15] = a[3] * d + a[7] * e + a[11] * b + a[15];
		return a
	}
	var g = a[0],
	f = a[1],
	h = a[2],
	i = a[3],
	j = a[4],
	k = a[5],
	l = a[6],
	o = a[7],
	m = a[8],
	n = a[9],
	p = a[10],
	r = a[11];
	c[0] = g;
	c[1] = f;
	c[2] = h;
	c[3] = i;
	c[4] = j;
	c[5] = k;
	c[6] = l;
	c[7] = o;
	c[8] = m;
	c[9] = n;
	c[10] = p;
	c[11] = r;
	c[12] = g * d + j * e + m * b + a[12];
	c[13] = f * d + k * e + n * b + a[13];
	c[14] = h * d + l * e + p * b + a[14];
	c[15] = i * d + o * e + r * b + a[15];
	return c
};
mat4.scale = function (a, b, c) {
	var d = b[0],
	e = b[1];
	b = b[2];
	if (!c || a == c) {
		a[0] *= d;
		a[1] *= d;
		a[2] *= d;
		a[3] *= d;
		a[4] *= e;
		a[5] *= e;
		a[6] *= e;
		a[7] *= e;
		a[8] *= b;
		a[9] *= b;
		a[10] *= b;
		a[11] *= b;
		return a
	}
	c[0] = a[0] * d;
	c[1] = a[1] * d;
	c[2] = a[2] * d;
	c[3] = a[3] * d;
	c[4] = a[4] * e;
	c[5] = a[5] * e;
	c[6] = a[6] * e;
	c[7] = a[7] * e;
	c[8] = a[8] * b;
	c[9] = a[9] * b;
	c[10] = a[10] * b;
	c[11] = a[11] * b;
	c[12] = a[12];
	c[13] = a[13];
	c[14] = a[14];
	c[15] = a[15];
	return c
};
mat4.rotate = function (a, b, c, d) {
	var e = c[0],
	g = c[1];
	c = c[2];
	var f = Math.sqrt(e * e + g * g + c * c);
	if (!f) return null;
	if (f != 1) {
		f = 1 / f;
		e *= f;
		g *= f;
		c *= f
	}
	var h = Math.sin(b),
	i = Math.cos(b),
	j = 1 - i;
	b = a[0];
	f = a[1];
	var k = a[2],
	l = a[3],
	o = a[4],
	m = a[5],
	n = a[6],
	p = a[7],
	r = a[8],
	s = a[9],
	A = a[10],
	B = a[11],
	t = e * e * j + i,
	u = g * e * j + c * h,
	v = c * e * j - g * h,
	w = e * g * j - c * h,
	x = g * g * j + i,
	y = c * g * j + e * h,
	z = e * c * j + g * h;
	e = g * c * j - e * h;
	g = c * c * j + i;
	if (d) {
		if (a != d) {
			d[12] = a[12];
			d[13] = a[13];
			d[14] = a[14];
			d[15] = a[15]
		}
	} else d = a;
	d[0] = b * t + o * u + r * v;
	d[1] = f * t + m * u + s * v;
	d[2] = k * t + n * u + A * v;
	d[3] = l * t + p * u + B * v;
	d[4] = b * w + o * x + r * y;
	d[5] = f * w + m * x + s * y;
	d[6] = k * w + n * x + A * y;
	d[7] = l * w + p * x + B * y;
	d[8] = b * z + o * e + r * g;
	d[9] = f * z + m * e + s * g;
	d[10] = k * z + n * e + A * g;
	d[11] = l * z + p * e + B * g;
	return d
};
mat4.rotateX = function (a, b, c) {
	var d = Math.sin(b);
	b = Math.cos(b);
	var e = a[4],
	g = a[5],
	f = a[6],
	h = a[7],
	i = a[8],
	j = a[9],
	k = a[10],
	l = a[11];
	if (c) {
		if (a != c) {
			c[0] = a[0];
			c[1] = a[1];
			c[2] = a[2];
			c[3] = a[3];
			c[12] = a[12];
			c[13] = a[13];
			c[14] = a[14];
			c[15] = a[15]
		}
	} else c = a;
	c[4] = e * b + i * d;
	c[5] = g * b + j * d;
	c[6] = f * b + k * d;
	c[7] = h * b + l * d;
	c[8] = e * -d + i * b;
	c[9] = g * -d + j * b;
	c[10] = f * -d + k * b;
	c[11] = h * -d + l * b;
	return c
};
mat4.rotateY = function (a, b, c) {
	var d = Math.sin(b);
	b = Math.cos(b);
	var e = a[0],
	g = a[1],
	f = a[2],
	h = a[3],
	i = a[8],
	j = a[9],
	k = a[10],
	l = a[11];
	if (c) {
		if (a != c) {
			c[4] = a[4];
			c[5] = a[5];
			c[6] = a[6];
			c[7] = a[7];
			c[12] = a[12];
			c[13] = a[13];
			c[14] = a[14];
			c[15] = a[15]
		}
	} else c = a;
	c[0] = e * b + i * -d;
	c[1] = g * b + j * -d;
	c[2] = f * b + k * -d;
	c[3] = h * b + l * -d;
	c[8] = e * d + i * b;
	c[9] = g * d + j * b;
	c[10] = f * d + k * b;
	c[11] = h * d + l * b;
	return c
};
mat4.rotateZ = function (a, b, c) {
	var d = Math.sin(b);
	b = Math.cos(b);
	var e = a[0],
	g = a[1],
	f = a[2],
	h = a[3],
	i = a[4],
	j = a[5],
	k = a[6],
	l = a[7];
	if (c) {
		if (a != c) {
			c[8] = a[8];
			c[9] = a[9];
			c[10] = a[10];
			c[11] = a[11];
			c[12] = a[12];
			c[13] = a[13];
			c[14] = a[14];
			c[15] = a[15]
		}
	} else c = a;
	c[0] = e * b + i * d;
	c[1] = g * b + j * d;
	c[2] = f * b + k * d;
	c[3] = h * b + l * d;
	c[4] = e * -d + i * b;
	c[5] = g * -d + j * b;
	c[6] = f * -d + k * b;
	c[7] = h * -d + l * b;
	return c
};
mat4.frustum = function (a, b, c, d, e, g, f) {
	f || (f = mat4.create());
	var h = b - a,
	i = d - c,
	j = g - e;
	f[0] = e * 2 / h;
	f[1] = 0;
	f[2] = 0;
	f[3] = 0;
	f[4] = 0;
	f[5] = e * 2 / i;
	f[6] = 0;
	f[7] = 0;
	f[8] = (b + a) / h;
	f[9] = (d + c) / i;
	f[10] = -(g + e) / j;
	f[11] = -1;
	f[12] = 0;
	f[13] = 0;
	f[14] = -(g * e * 2) / j;
	f[15] = 0;
	return f
};
mat4.perspective = function (a, b, c, d, e) {
	a = c * Math.tan(a * Math.PI / 360);
	b = a * b;
	return mat4.frustum( - b, b, -a, a, c, d, e)
};
mat4.ortho = function (a, b, c, d, e, g, f) {
	f || (f = mat4.create());
	var h = b - a,
	i = d - c,
	j = g - e;
	f[0] = 2 / h;
	f[1] = 0;
	f[2] = 0;
	f[3] = 0;
	f[4] = 0;
	f[5] = 2 / i;
	f[6] = 0;
	f[7] = 0;
	f[8] = 0;
	f[9] = 0;
	f[10] = -2 / j;
	f[11] = 0;
	f[12] = -(a + b) / h;
	f[13] = -(d + c) / i;
	f[14] = -(g + e) / j;
	f[15] = 1;
	return f
};
mat4.lookAt = function (a, b, c, d) {
	d || (d = mat4.create());
	var e = a[0],
	g = a[1];
	a = a[2];
	var f = c[0],
	h = c[1],
	i = c[2];
	c = b[1];
	var j = b[2];
	if (e == b[0] && g == c && a == j) return mat4.identity(d);
	var k, l, o, m;
	c = e - b[0];
	j = g - b[1];
	b = a - b[2];
	m = 1 / Math.sqrt(c * c + j * j + b * b);
	c *= m;
	j *= m;
	b *= m;
	k = h * b - i * j;
	i = i * c - f * b;
	f = f * j - h * c;
	if (m = Math.sqrt(k * k + i * i + f * f)) {
		m = 1 / m;
		k *= m;
		i *= m;
		f *= m
	} else f = i = k = 0;
	h = j * f - b * i;
	l = b * k - c * f;
	o = c * i - j * k;
	if (m = Math.sqrt(h * h + l * l + o * o)) {
		m = 1 / m;
		h *= m;
		l *= m;
		o *= m
	} else o = l = h = 0;
	d[0] = k;
	d[1] = h;
	d[2] = c;
	d[3] = 0;
	d[4] = i;
	d[5] = l;
	d[6] = j;
	d[7] = 0;
	d[8] = f;
	d[9] = o;
	d[10] = b;
	d[11] = 0;
	d[12] = -(k * e + i * g + f * a);
	d[13] = -(h * e + l * g + o * a);
	d[14] = -(c * e + j * g + b * a);
	d[15] = 1;
	return d
};
mat4.str = function (a) {
	return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ", " + a[4] + ", " + a[5] + ", " + a[6] + ", " + a[7] + ", " + a[8] + ", " + a[9] + ", " + a[10] + ", " + a[11] + ", " + a[12] + ", " + a[13] + ", " + a[14] + ", " + a[15] + "]"
};
quat4 = {};
quat4.create = function (a) {
	var b = new glMatrixArrayType(4);
	if (a) {
		b[0] = a[0];
		b[1] = a[1];
		b[2] = a[2];
		b[3] = a[3]
	}
	return b
};
quat4.set = function (a, b) {
	b[0] = a[0];
	b[1] = a[1];
	b[2] = a[2];
	b[3] = a[3];
	return b
};
quat4.calculateW = function (a, b) {
	var c = a[0],
	d = a[1],
	e = a[2];
	if (!b || a == b) {
		a[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
		return a
	}
	b[0] = c;
	b[1] = d;
	b[2] = e;
	b[3] = -Math.sqrt(Math.abs(1 - c * c - d * d - e * e));
	return b
};
quat4.inverse = function (a, b) {
	if (!b || a == b) {
		a[0] *= 1;
		a[1] *= 1;
		a[2] *= 1;
		return a
	}
	b[0] = -a[0];
	b[1] = -a[1];
	b[2] = -a[2];
	b[3] = a[3];
	return b
};
quat4.length = function (a) {
	var b = a[0],
	c = a[1],
	d = a[2];
	a = a[3];
	return Math.sqrt(b * b + c * c + d * d + a * a)
};
quat4.normalize = function (a, b) {
	b || (b = a);
	var c = a[0],
	d = a[1],
	e = a[2],
	g = a[3],
	f = Math.sqrt(c * c + d * d + e * e + g * g);
	if (f == 0) {
		b[0] = 0;
		b[1] = 0;
		b[2] = 0;
		b[3] = 0;
		return b
	}
	f = 1 / f;
	b[0] = c * f;
	b[1] = d * f;
	b[2] = e * f;
	b[3] = g * f;
	return b
};
quat4.multiply = function (a, b, c) {
	c || (c = a);
	var d = a[0],
	e = a[1],
	g = a[2];
	a = a[3];
	var f = b[0],
	h = b[1],
	i = b[2];
	b = b[3];
	c[0] = d * b + a * f + e * i - g * h;
	c[1] = e * b + a * h + g * f - d * i;
	c[2] = g * b + a * i + d * h - e * f;
	c[3] = a * b - d * f - e * h - g * i;
	return c
};
quat4.multiplyVec3 = function (a, b, c) {
	c || (c = b);
	var d = b[0],
	e = b[1],
	g = b[2];
	b = a[0];
	var f = a[1],
	h = a[2];
	a = a[3];
	var i = a * d + f * g - h * e,
	j = a * e + h * d - b * g,
	k = a * g + b * e - f * d;
	d = -b * d - f * e - h * g;
	c[0] = i * a + d * -b + j * -h - k * -f;
	c[1] = j * a + d * -f + k * -b - i * -h;
	c[2] = k * a + d * -h + i * -f - j * -b;
	return c
};
quat4.toMat3 = function (a, b) {
	b || (b = mat3.create());
	var c = a[0],
	d = a[1],
	e = a[2],
	g = a[3],
	f = c + c,
	h = d + d,
	i = e + e,
	j = c * f,
	k = c * h;
	c = c * i;
	var l = d * h;
	d = d * i;
	e = e * i;
	f = g * f;
	h = g * h;
	g = g * i;
	b[0] = 1 - (l + e);
	b[1] = k - g;
	b[2] = c + h;
	b[3] = k + g;
	b[4] = 1 - (j + e);
	b[5] = d - f;
	b[6] = c - h;
	b[7] = d + f;
	b[8] = 1 - (j + l);
	return b
};
quat4.toMat4 = function (a, b) {
	b || (b = mat4.create());
	var c = a[0],
	d = a[1],
	e = a[2],
	g = a[3],
	f = c + c,
	h = d + d,
	i = e + e,
	j = c * f,
	k = c * h;
	c = c * i;
	var l = d * h;
	d = d * i;
	e = e * i;
	f = g * f;
	h = g * h;
	g = g * i;
	b[0] = 1 - (l + e);
	b[1] = k - g;
	b[2] = c + h;
	b[3] = 0;
	b[4] = k + g;
	b[5] = 1 - (j + e);
	b[6] = d - f;
	b[7] = 0;
	b[8] = c - h;
	b[9] = d + f;
	b[10] = 1 - (j + l);
	b[11] = 0;
	b[12] = 0;
	b[13] = 0;
	b[14] = 0;
	b[15] = 1;
	return b
};
quat4.slerp = function (a, b, c, d) {
	d || (d = a);
	var e = c;
	if (a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3] < 0) e = -1 * c;
	d[0] = 1 - c * a[0] + e * b[0];
	d[1] = 1 - c * a[1] + e * b[1];
	d[2] = 1 - c * a[2] + e * b[2];
	d[3] = 1 - c * a[3] + e * b[3];
	return d
};
quat4.str = function (a) {
	return "[" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + "]"
};
WebGLUtils = function () {
	var makeFailHTML = function (msg) {
		return msg
	};
	var GET_A_WEBGL_BROWSER = '' + 'This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
	var OTHER_PROBLEM = '' + "It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';
	var setupWebGL = function (canvas, opt_attribs) {
		function showLink(str) {
			var container = canvas.parentNode;
			if (container) {
				container.innerHTML = makeFailHTML(str)
			}
		};
		if (!window.WebGLRenderingContext) {
			showLink(GET_A_WEBGL_BROWSER);
			return null
		}
		var context = create3DContext(canvas, opt_attribs);
		if (!context) {
			showLink(OTHER_PROBLEM)
		}
		return context
	};
	var create3DContext = function (canvas, opt_attribs) {
		var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
		var context = null;
		for (var ii = 0; ii < names.length; ++ii) {
			try {
				context = canvas.getContext(names[ii], opt_attribs)
			} catch(e) {}
			if (context) {
				break
			}
		}
		return context
	};
	return {
		create3DContext: create3DContext,
		setupWebGL: setupWebGL
	}
} ();
window.requestAnimFrame = (function () {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
	function (callback, element) {
		return window.setTimeout(callback, 1000 / 60)
	}
})();
window.cancelRequestAnimFrame = (function () {
	return window.cancelCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout
})();
function DrawBuffer(vertices, texcoords, indices) {
	this.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.vertexPositionBuffer.itemSize = 2;
	this.vertexPositionBuffer.numItems = vertices.length / 2;
	this.vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
	this.vertexTextureCoordBuffer.itemSize = 2;
	this.vertexTextureCoordBuffer.numItems = texcoords.length / 2;
	this.vertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	this.vertexIndexBuffer.itemSize = 1;
	this.vertexIndexBuffer.numItems = indices.length
}
DrawBuffer.prototype.Draw = function () {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
	setMatrixUniforms();
	gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)
};
function DrawBuffer3D(vertices, texcoords, indices) {
	this.vertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	this.vertexPositionBuffer.itemSize = 3;
	this.vertexPositionBuffer.numItems = vertices.length / 3;
	this.vertexTextureCoordBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(texcoords), gl.STATIC_DRAW);
	this.vertexTextureCoordBuffer.itemSize = 2;
	this.vertexTextureCoordBuffer.numItems = texcoords.length / 2;
	this.vertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
	this.vertexIndexBuffer.itemSize = 1;
	this.vertexIndexBuffer.numItems = indices.length
}
DrawBuffer3D.prototype.Draw = function () {
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexTextureCoordBuffer);
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.vertexTextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
	setMatrixUniforms();
	gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0)
};
function PositionTextureVertex(x, y, z, tx, ty) {
	this.vector3D = [x, y, z];
	this.texturePositionX = tx;
	this.texturePositionY = ty
}
PositionTextureVertex.prototype.setTexturePosition = function (tx, ty) {
	return new PositionTextureVertex(this.vector3D[0], this.vector3D[1], this.vector3D[2], tx, ty)
};
function TexturedQuad(texturedVertices) {
	this.vertices = texturedVertices
}
function TexturedQuad(texturedVertices, par2, par3, par4, par5, par6, par7) {
	this.vertices = texturedVertices;
	var f = 0.0 / par6;
	var f1 = 0.0 / par7;
	this.vertices[0] = this.vertices[0].setTexturePosition(par4 / par6 - f, par3 / par7 + f1);
	this.vertices[1] = this.vertices[1].setTexturePosition(par2 / par6 + f, par3 / par7 + f1);
	this.vertices[2] = this.vertices[2].setTexturePosition(par2 / par6 + f, par5 / par7 - f1);
	this.vertices[3] = this.vertices[3].setTexturePosition(par4 / par6 - f, par5 / par7 - f1)
}
TexturedQuad.prototype.flipFace = function () {
	this.vertices.reverse()
};
function ModelBox(par1ModelRenderer, par2, par3, par4, par5, par6, par7, par8, par9, par10) {
	this.posX1 = par4;
	this.posY1 = par5;
	this.posZ1 = par6;
	this.posX2 = par4 + par7;
	this.posY2 = par5 + par8;
	this.posZ2 = par6 + par9;
	this.vertexPositions = [];
	this.quadList = [];
	var f = par4 + par7;
	var f1 = par5 + par8;
	var f2 = par6 + par9;
	par4 -= par10;
	par5 -= par10;
	par6 -= par10;
	f += par10;
	f1 += par10;
	f2 += par10;
	if (par1ModelRenderer.mirror) {
		var f3 = f;
		f = par4;
		par4 = f3
	}
	var positiontexturevertex = new PositionTextureVertex(par4, par5, par6, 0.0, 0.0);
	var positiontexturevertex1 = new PositionTextureVertex(f, par5, par6, 0.0, 8);
	var positiontexturevertex2 = new PositionTextureVertex(f, f1, par6, 8, 8);
	var positiontexturevertex3 = new PositionTextureVertex(par4, f1, par6, 8, 0.0);
	var positiontexturevertex4 = new PositionTextureVertex(par4, par5, f2, 0.0, 0.0);
	var positiontexturevertex5 = new PositionTextureVertex(f, par5, f2, 0.0, 8);
	var positiontexturevertex6 = new PositionTextureVertex(f, f1, f2, 8, 8);
	var positiontexturevertex7 = new PositionTextureVertex(par4, f1, f2, 8, 0.0);
	this.vertexPositions[0] = positiontexturevertex;
	this.vertexPositions[1] = positiontexturevertex1;
	this.vertexPositions[2] = positiontexturevertex2;
	this.vertexPositions[3] = positiontexturevertex3;
	this.vertexPositions[4] = positiontexturevertex4;
	this.vertexPositions[5] = positiontexturevertex5;
	this.vertexPositions[6] = positiontexturevertex6;
	this.vertexPositions[7] = positiontexturevertex7;
	this.quadList[0] = new TexturedQuad([positiontexturevertex5, positiontexturevertex1, positiontexturevertex2, positiontexturevertex6], par2 + par9 + par7, par3 + par9, par2 + par9 + par7 + par9, par3 + par9 + par8, par1ModelRenderer.textureWidth, par1ModelRenderer.textureHeight);
	this.quadList[1] = new TexturedQuad([positiontexturevertex, positiontexturevertex4, positiontexturevertex7, positiontexturevertex3], par2 + 0, par3 + par9, par2 + par9, par3 + par9 + par8, par1ModelRenderer.textureWidth, par1ModelRenderer.textureHeight);
	this.quadList[2] = new TexturedQuad([positiontexturevertex5, positiontexturevertex4, positiontexturevertex, positiontexturevertex1], par2 + par9, par3 + 0, par2 + par9 + par7, par3 + par9, par1ModelRenderer.textureWidth, par1ModelRenderer.textureHeight);
	this.quadList[3] = new TexturedQuad([positiontexturevertex2, positiontexturevertex3, positiontexturevertex7, positiontexturevertex6], par2 + par9 + par7, par3 + par9, par2 + par9 + par7 + par7, par3 + 0, par1ModelRenderer.textureWidth, par1ModelRenderer.textureHeight);
	this.quadList[4] = new TexturedQuad([positiontexturevertex1, positiontexturevertex, positiontexturevertex3, positiontexturevertex2], par2 + par9, par3 + par9, par2 + par9 + par7, par3 + par9 + par8, par1ModelRenderer.textureWidth, par1ModelRenderer.textureHeight);
	this.quadList[5] = new TexturedQuad([positiontexturevertex4, positiontexturevertex5, positiontexturevertex6, positiontexturevertex7], par2 + par9 + par7 + par9, par3 + par9, par2 + par9 + par7 + par9 + par7, par3 + par9 + par8, par1ModelRenderer.textureWidth, par1ModelRenderer.textureHeight);
	if (par1ModelRenderer.mirror) {
		for (var i = 0; i < this.quadList.length; i++) this.quadList[i].flipFace()
	}
	var vertices = [];
	var texCoords = [];
	var indices = [];
	var offset = 0;
	for (var i = 0; i < this.quadList.length; ++i) {
		var quad = this.quadList[i];
		for (var v = 0; v < quad.vertices.length; ++v) {
			for (var z = 0; z < 3; ++z) vertices.push(quad.vertices[v].vector3D[z]);
			texCoords.push(quad.vertices[v].texturePositionX);
			texCoords.push(quad.vertices[v].texturePositionY)
		};
		indices.push(offset);
		indices.push(offset + 1);
		indices.push(offset + 2);
		indices.push(offset);
		indices.push(offset + 2);
		indices.push(offset + 3);
		offset += 4
	}
	this.drawBuffer = new DrawBuffer3D(vertices, texCoords, indices)
}
function ModelRenderer(par1ModelBase, tx, ty, texture) {
	this.textureWidth = texture.width;
	this.textureHeight = texture.height;
	this.mirror = false;
	this.showModel = true;
	this.isHidden = false;
	this.cubeList = [];
	this.baseModel = par1ModelBase;
	par1ModelBase.boxList.push(this);
	this.setTextureOffset(tx, ty);
	this.setRotationPoint(0, 0, 0);
	this.setTextureSize(par1ModelBase.textureWidth, par1ModelBase.textureHeight);
	this.rotateAngleX = this.rotateAngleY = this.rotateAngleZ = 0
}
ModelRenderer.prototype.addBox = function (par1, par2, par3, par4, par5, par6, scale) {
	if (!scale) var scale = 0.0;
	this.cubeList.push(new ModelBox(this, this.textureOffsetX, this.textureOffsetY, par1, par2, par3, par4, par5, par6, scale));
	return this
};
ModelRenderer.prototype.setRotationPoint = function (par1, par2, par3) {
	this.rotationPointX = par1;
	this.rotationPointY = par2;
	this.rotationPointZ = par3
};
ModelRenderer.prototype.setTextureOffset = function (par1, par2) {
	this.textureOffsetX = par1;
	this.textureOffsetY = par2;
	return this
};
ModelRenderer.prototype.setTextureSize = function (par1, par2) {
	this.textureWidth = par1;
	this.textureHeight = par2;
	return this
};
ModelRenderer.prototype.render = function (par1) {
	if (this.isHidden) return;
	if (!this.showModel) return;
	if (this.rotateAngleX != 0.0 || this.rotateAngleY != 0.0 || this.rotateAngleZ != 0.0) {
		mvPushMatrix();
		mat4.translate(mvMatrix, [this.rotationPointX * par1, this.rotationPointY * par1, this.rotationPointZ * par1]);
		if (this.rotateAngleZ != 0.0) mat4.rotate(mvMatrix, this.rotateAngleZ, [0.0, 0.0, 1.0]);
		if (this.rotateAngleY != 0.0) mat4.rotate(mvMatrix, this.rotateAngleY, [0.0, 1.0, 0.0]);
		if (this.rotateAngleX != 0.0) mat4.rotate(mvMatrix, this.rotateAngleX, [1.0, 0.0, 0.0]);
		this.cubeList[0].drawBuffer.Draw();
		mvPopMatrix()
	} else if (this.rotationPointX != 0.0 || this.rotationPointY != 0.0 || this.rotationPointZ != 0.0) {
		mat4.translate(mvMatrix, [this.rotationPointX * par1, this.rotationPointY * par1, this.rotationPointZ * par1]);
		this.cubeList[0].drawBuffer.Draw();
		mat4.translate(mvMatrix, [ - this.rotationPointX * par1, -this.rotationPointY * par1, -this.rotationPointZ * par1])
	} else {
		this.cubeList[0].drawBuffer.Draw()
	}
};
function ModelBase() {
	this.onGround = 0;
	this.isRiding = false;
	this.boxList = [];
	this.isChild = true;
	this.textureWidth = 64;
	this.textureHeight = 32
}
ModelBiped.prototype = new ModelBase;
ModelBiped.prototype.constructor = ModelBiped;
function ModelBiped(par1, par2, image) {
	if (!par2) par2 = 0.0;
	if (!par1) par1 = 0.0;
	this.textureWidth = image.width;
	this.textureHeight = image.height;
	this.heldItemLeft = 0;
	this.heldItemRight = 0;
	this.isSneak = false;
	this.aimedBow = false;
	this.rotatehead = true;
	this.bipedCloak = new ModelRenderer(this, 0, 0, image);
	this.bipedCloak.addBox( - 5, 0.0, -1, 10, 16, 1, par1);
	this.bipedEars = new ModelRenderer(this, 24, 0, image);
	this.bipedEars.addBox( - 3, -6, -1, 6, 6, 1, par1);
	this.bipedHead = new ModelRenderer(this, 0, 0, image);
	this.bipedHead.addBox( - 4, -8, -4, 8, 8, 8, par1);
	this.bipedHead.setRotationPoint(0.0, 0.0 + par2, 0.0);
	this.bipedHeadwear = new ModelRenderer(this, 32, 0, image);
	this.bipedHeadwear.addBox( - 4, -8, -4, 8, 8, 8, par1 + 0.5);
	this.bipedHeadwear.setRotationPoint(0.0, 0.0 + par2, 0.0);
	this.bipedBody = new ModelRenderer(this, 16, 16, image);
	this.bipedBody.addBox( - 4, 0.0, -2, 8, 12, 4, par1);
	this.bipedBody.setRotationPoint(0.0, 0.0 + par2, 0.0);
	if (image.height === 64) {
		this.bipedBodyOver = new ModelRenderer(this, 16, 32, image);
		this.bipedBodyOver.addBox( - 4, 0.0, -2, 8, 12, 4, par1 + 0.5);
		this.bipedBodyOver.setRotationPoint(0.0, 0.0 + par2, 0.0)
	}
	this.bipedRightArm = new ModelRenderer(this, 40, 16, image);
	this.bipedRightArm.addBox(alexArms ? -2 : -3, -2, -2, alexArms ? 3 : 4, 12, 4, par1);
	this.bipedRightArm.setRotationPoint( - 5, 2.0 + par2, 0.0);
	if (image.height === 64) {
		this.bipedRightArmOver = new ModelRenderer(this, 40, 32, image);
		this.bipedRightArmOver.addBox(alexArms ? -2 : -3, -2, -2, alexArms ? 3 : 4, 12, 4, par1 + 0.5);
		this.bipedRightArmOver.setRotationPoint( - 5, 2.0 + par2, 0.0)
	}
	if (image.height === 32) this.bipedLeftArm = new ModelRenderer(this, 40, 16, image);
	else this.bipedLeftArm = new ModelRenderer(this, 32, 48, image);
	if (image.height !== 64) this.bipedLeftArm.mirror = true;
	this.bipedLeftArm.addBox( - 1, -2, -2, alexArms ? 3 : 4, 12, 4, par1);
	this.bipedLeftArm.setRotationPoint(5, 2.0 + par2, 0.0);
	if (image.height === 64) {
		this.bipedLeftArmOver = new ModelRenderer(this, 48, 48, image);
		this.bipedLeftArmOver.mirror = false;
		this.bipedLeftArmOver.addBox( - 1, -2, -2, alexArms ? 3 : 4, 12, 4, par1 + 0.5);
		this.bipedLeftArmOver.setRotationPoint(5, 2.0 + par2, 0.0)
	}
	this.bipedRightLeg = new ModelRenderer(this, 0, 16, image);
	this.bipedRightLeg.addBox( - 2, 0.0, -2, 4, 12, 4, par1);
	this.bipedRightLeg.setRotationPoint( - 2, 12 + par2, 0.0);
	if (image.height === 64) {
		this.bipedRightLegOver = new ModelRenderer(this, 0, 32, image);
		this.bipedRightLegOver.addBox( - 2, 0.0, -2, 4, 12, 4, par1 + 0.5);
		this.bipedRightLegOver.setRotationPoint( - 2, 12 + par2, 0.0)
	}
	if (image.height === 32) this.bipedLeftLeg = new ModelRenderer(this, 0, 16, image);
	else this.bipedLeftLeg = new ModelRenderer(this, 16, 48, image);
	if (image.height !== 64) this.bipedLeftLeg.mirror = true;
	this.bipedLeftLeg.addBox( - 2, 0.0, -2, 4, 12, 4, par1);
	this.bipedLeftLeg.setRotationPoint(2.0, 12 + par2, 0.0);
	if (image.height === 64) {
		this.bipedLeftLegOver = new ModelRenderer(this, 0, 48, image);
		this.bipedLeftLegOver.mirror = false;
		this.bipedLeftLegOver.addBox( - 2, 0.0, -2, 4, 12, 4, par1 + 0.5);
		this.bipedLeftLegOver.setRotationPoint(2.0, 12 + par2, 0.0)
	}
}
ModelBiped.prototype.render = function (par2, par3, par4, par5, par6, par7) {
	this.setRotationAngles(par2, par3, par4, par5, par6, par7);
	this.bipedHead.render(par7);
	this.bipedBody.render(par7);
	this.bipedRightArm.render(par7);
	this.bipedLeftArm.render(par7);
	this.bipedRightLeg.render(par7);
	this.bipedLeftLeg.render(par7);
	this.bipedHeadwear.render(par7);
	if (this.bipedBodyOver) {
		if (!this.bipedHeadwear.isHidden) {
			this.bipedBodyOver.rotateAngleX = this.bipedBody.rotateAngleX;
			this.bipedBodyOver.rotateAngleY = this.bipedBody.rotateAngleY;
			this.bipedBodyOver.render(par7);
			this.bipedRightArmOver.rotationPointX = this.bipedRightArm.rotationPointX;
			this.bipedRightArmOver.rotationPointY = this.bipedRightArm.rotationPointY;
			this.bipedRightArmOver.rotationPointZ = this.bipedRightArm.rotationPointZ;
			this.bipedRightArmOver.rotateAngleX = this.bipedRightArm.rotateAngleX;
			this.bipedRightArmOver.rotateAngleY = this.bipedRightArm.rotateAngleY;
			this.bipedRightArmOver.rotateAngleZ = this.bipedRightArm.rotateAngleZ;
			this.bipedRightArmOver.render(par7);
			this.bipedLeftArmOver.rotationPointX = this.bipedLeftArm.rotationPointX;
			this.bipedLeftArmOver.rotationPointY = this.bipedLeftArm.rotationPointY;
			this.bipedLeftArmOver.rotationPointZ = this.bipedLeftArm.rotationPointZ;
			this.bipedLeftArmOver.rotateAngleX = this.bipedLeftArm.rotateAngleX;
			this.bipedLeftArmOver.rotateAngleY = this.bipedLeftArm.rotateAngleY;
			this.bipedLeftArmOver.rotateAngleZ = this.bipedLeftArm.rotateAngleZ;
			this.bipedLeftArmOver.render(par7);
			this.bipedRightLegOver.rotationPointX = this.bipedRightLeg.rotationPointX;
			this.bipedRightLegOver.rotationPointY = this.bipedRightLeg.rotationPointY;
			this.bipedRightLegOver.rotationPointZ = this.bipedRightLeg.rotationPointZ;
			this.bipedRightLegOver.rotateAngleX = this.bipedRightLeg.rotateAngleX;
			this.bipedRightLegOver.rotateAngleY = this.bipedRightLeg.rotateAngleY;
			this.bipedRightLegOver.rotateAngleZ = this.bipedRightLeg.rotateAngleZ;
			this.bipedRightLegOver.render(par7);
			this.bipedLeftLegOver.rotationPointX = this.bipedLeftLeg.rotationPointX;
			this.bipedLeftLegOver.rotationPointY = this.bipedLeftLeg.rotationPointY;
			this.bipedLeftLegOver.rotationPointZ = this.bipedLeftLeg.rotationPointZ;
			this.bipedLeftLegOver.rotateAngleX = this.bipedLeftLeg.rotateAngleX;
			this.bipedLeftLegOver.rotateAngleY = this.bipedLeftLeg.rotateAngleY;
			this.bipedLeftLegOver.rotateAngleZ = this.bipedLeftLeg.rotateAngleZ;
			this.bipedLeftLegOver.render(par7)
		}
	}
};
ModelBiped.prototype.setRotationAngles = function (par1, par2, par3, par4, par5, par6) {
	if (this.rotatehead) {
		this.bipedHead.rotateAngleY = (Math.sin((par3 / 3) * 0.23) * 1.0);
		this.bipedHead.rotateAngleX = (Math.sin((par3 / 3) * 0.1) * 0.8)
	} else {
		this.bipedHead.rotateAngleY = par4 / (180 / Math.PI);
		this.bipedHead.rotateAngleX = par5 / (180 / Math.PI)
	}
	this.bipedHeadwear.rotateAngleY = this.bipedHead.rotateAngleY;
	this.bipedHeadwear.rotateAngleX = this.bipedHead.rotateAngleX;
	if (!this.isSneak && !this.isRiding && this.oldwalking) {
		this.bipedRightArm.rotateAngleX = Math.cos(par1 * 0.6662 + Math.PI) * 2.0 * par2;
		this.bipedLeftArm.rotateAngleX = Math.cos(par1 * 0.6662) * 2.0 * par2;
		this.bipedLeftArm.rotateAngleZ = (Math.cos(par1 * 0.2812) - 1.0) * 1.0 * par2;
		this.bipedRightArm.rotateAngleZ = (Math.cos(par1 * 0.2312) + 1.0) * 1.0 * par2
	} else {
		this.bipedRightArm.rotateAngleX = Math.cos(par1 * 0.6662 + Math.PI) * 2.0 * par2 * 0.5;
		this.bipedLeftArm.rotateAngleX = Math.cos(par1 * 0.6662) * 2.0 * par2 * 0.5;
		this.bipedLeftArm.rotateAngleZ = 0.0;
		this.bipedRightArm.rotateAngleZ = 0.0
	}
	this.bipedRightLeg.rotateAngleX = Math.cos(par1 * 0.6662) * 1.4 * par2;
	this.bipedLeftLeg.rotateAngleX = Math.cos(par1 * 0.6662 + Math.PI) * 1.4 * par2;
	this.bipedRightLeg.rotateAngleY = 0.0;
	this.bipedLeftLeg.rotateAngleY = 0.0;
	if (this.isRiding) {
		this.bipedRightArm.rotateAngleX += -(Math.PI / 5);
		this.bipedLeftArm.rotateAngleX += -(Math.PI / 5);
		this.bipedRightLeg.rotateAngleX = -(Math.PI * 2 / 5);
		this.bipedLeftLeg.rotateAngleX = -(Math.PI * 2 / 5);
		this.bipedRightLeg.rotateAngleY = (Math.PI / 10);
		this.bipedLeftLeg.rotateAngleY = -(Math.PI / 10)
	}
	if (this.heldItemLeft != 0 && !this.oldwalking) {
		this.bipedLeftArm.rotateAngleX = this.bipedLeftArm.rotateAngleX * 0.5 - (Math.PI / 10) * this.heldItemLeft
	}
	if (this.heldItemRight != 0 && !this.oldwalking) {
		this.bipedRightArm.rotateAngleX = this.bipedRightArm.rotateAngleX * 0.5 - (Math.PI / 10) * this.heldItemRight
	}
	this.bipedRightArm.rotateAngleY = 0.0;
	this.bipedLeftArm.rotateAngleY = 0.0;
	if (this.onGround > -9990 && !this.oldwalking) {
		var f = this.onGround;
		this.bipedBody.rotateAngleY = Math.sin(Math.sqrt(f) * Math.PI * 2.0) * 0.2;
		this.bipedRightArm.rotationPointZ = Math.sin(this.bipedBody.rotateAngleY) * 5;
		this.bipedRightArm.rotationPointX = -Math.cos(this.bipedBody.rotateAngleY) * 5;
		this.bipedLeftArm.rotationPointZ = -Math.sin(this.bipedBody.rotateAngleY) * 5;
		this.bipedLeftArm.rotationPointX = Math.cos(this.bipedBody.rotateAngleY) * 5;
		this.bipedRightArm.rotateAngleY += this.bipedBody.rotateAngleY;
		this.bipedLeftArm.rotateAngleY += this.bipedBody.rotateAngleY;
		this.bipedLeftArm.rotateAngleX += this.bipedBody.rotateAngleY;
		f = 1.0 - this.onGround;
		f *= f;
		f *= f;
		f = 1.0 - f;
		var f2 = Math.sin(f * Math.PI);
		var f4 = Math.sin(this.onGround * Math.PI) * -(this.bipedHead.rotateAngleX - 0.7) * 0.75;
		this.bipedRightArm.rotateAngleX -= f2 * 1.2 + f4;
		this.bipedRightArm.rotateAngleY += this.bipedBody.rotateAngleY * 2.0;
		this.bipedRightArm.rotateAngleZ = Math.sin(this.onGround * Math.PI) * -0.4
	}
	if (this.isSneak) {
		this.bipedBody.rotateAngleX = 0.5;
		this.bipedRightLeg.rotateAngleX -= 0.0;
		this.bipedLeftLeg.rotateAngleX -= 0.0;
		this.bipedRightArm.rotateAngleX += 0.4;
		this.bipedLeftArm.rotateAngleX += 0.4;
		this.bipedRightLeg.rotationPointZ = 4;
		this.bipedLeftLeg.rotationPointZ = 4;
		this.bipedRightLeg.rotationPointY = 9;
		this.bipedLeftLeg.rotationPointY = 9;
		this.bipedHead.rotationPointY = 1.0
	} else {
		this.bipedBody.rotateAngleX = 0.0;
		this.bipedRightLeg.rotationPointZ = 0.0;
		this.bipedLeftLeg.rotationPointZ = 0.0;
		this.bipedRightLeg.rotationPointY = 12;
		this.bipedLeftLeg.rotationPointY = 12;
		this.bipedHead.rotationPointY = 0.0
	}
	this.bipedHeadwear.rotationPointY = this.bipedHead.rotationPointY;
	this.bipedRightArm.rotateAngleZ += Math.cos(par3 * 0.09) * 0.05 + 0.05;
	this.bipedLeftArm.rotateAngleZ -= Math.cos(par3 * 0.09) * 0.05 + 0.05;
	this.bipedRightArm.rotateAngleX += Math.sin(par3 * 0.067) * 0.05;
	this.bipedLeftArm.rotateAngleX -= Math.sin(par3 * 0.067) * 0.05;
	if (this.aimedBow) {
		var f1 = 0.0;
		var f3 = 0.0;
		this.bipedRightArm.rotateAngleZ = 0.0;
		this.bipedLeftArm.rotateAngleZ = 0.0;
		this.bipedRightArm.rotateAngleY = -(0.1 - f1 * 0.6) + this.bipedHead.rotateAngleY;
		this.bipedLeftArm.rotateAngleY = (0.1 - f1 * 0.6) + this.bipedHead.rotateAngleY + 0.4;
		this.bipedRightArm.rotateAngleX = -(Math.PI / 2) + this.bipedHead.rotateAngleX;
		this.bipedLeftArm.rotateAngleX = -(Math.PI / 2) + this.bipedHead.rotateAngleX;
		this.bipedRightArm.rotateAngleX -= f1 * 1.2 - f3 * 0.4;
		this.bipedLeftArm.rotateAngleX -= f1 * 1.2 - f3 * 0.4;
		this.bipedRightArm.rotateAngleZ += Math.cos(par3 * 0.09) * 0.05 + 0.05;
		this.bipedLeftArm.rotateAngleZ -= Math.cos(par3 * 0.09) * 0.05 + 0.05;
		this.bipedRightArm.rotateAngleX += Math.sin(par3 * 0.067) * 0.05;
		this.bipedLeftArm.rotateAngleX -= Math.sin(par3 * 0.067) * 0.05
	}
};
function getRegularButtonTexCoords(row, col) {
	var oneWidth = 16.0 / 256.0;
	var one = 16.0 / 128.0;
	return [row * oneWidth, col * one, (row * oneWidth) + oneWidth, col * one, (row * oneWidth) + oneWidth, (col * one) + one, row * oneWidth, (col * one) + one]
};
function getHalfButtonTexCoords(row, col) {
	var oneWidth = 16.0 / 256.0;
	var one = 7.0 / 128.0;
	var startX = 16.0 / 256.0;
	var startY = 64.0 / 128.0;
	return [startX + (row * oneWidth), startY + (col * one), startX + ((row * oneWidth) + oneWidth), startY + (col * one), startX + ((row * oneWidth) + oneWidth), startY + ((col * one) + one), startX + (row * oneWidth), startY + ((col * one) + one)]
};
function getButtonVertices(width, height) {
	return [0, 0, width, 0, width, height, 0, height]
};
function GUIItem() {
	this.position = [0, 0];
	this.width = 0;
	this.parent = null
}
GUIItem.prototype.draw = function () {};
GUIItem.prototype.mouseDown = function () {
	return false
};
GUIButton.prototype = new GUIItem;
GUIButton.prototype.constructor = GUIButton;
function GUIButton(row) {
	this.displayRow = row;
	this.width = 16;
	this.normalDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 0), [0, 1, 2, 0, 2, 3]);
	this.normalHoverDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 1), [0, 1, 2, 0, 2, 3]);
	this.pressedDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 2), [0, 1, 2, 0, 2, 3]);
	this.pressedHoverDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 3), [0, 1, 2, 0, 2, 3]);
	this.hover = false
}
GUIButton.prototype.checkHover = function () {
	this.hover = false;
	if (localMousePos[0] < this.position[0] || localMousePos[1] < this.position[1] || localMousePos[0] >= (this.position[0] + this.width) || localMousePos[1] >= (this.position[1] + this.width)) return;
	this.hover = true
};
GUIButton.prototype.draw = function () {
	this.checkHover();
	if (!this.hover) {
		if (this.isDown && this.isDown()) this.currentDrawBuffer = this.pressedDrawBuffer;
		else this.currentDrawBuffer = this.normalDrawBuffer
	} else {
		if (this.isDown && this.isDown()) this.currentDrawBuffer = this.pressedHoverDrawBuffer;
		else this.currentDrawBuffer = this.normalHoverDrawBuffer
	}
	mat4.translate(mvMatrix, [this.position[0], this.position[1], 0]);
	this.currentDrawBuffer.Draw();
	mat4.translate(mvMatrix, [ - this.position[0], -this.position[1], 0])
};
GUIButton.prototype.mouseDown = function () {
	return false
};
GUISpinnerButton.prototype = new GUIItem;
GUISpinnerButton.prototype.constructor = GUISpinnerButton;
function GUISpinnerButton(row) {
	this.displayRow = row;
	this.width = 16;
	this.middleNormal = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 0), [0, 1, 2, 0, 2, 3]);
	this.middleNormalHover = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 1), [0, 1, 2, 0, 2, 3]);
	this.middlePressed = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 2), [0, 1, 2, 0, 2, 3]);
	this.middlePressedHover = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 3), [0, 1, 2, 0, 2, 3]);
	this.topNormal = new DrawBuffer(getButtonVertices(16, 7), getHalfButtonTexCoords(0, 0), [0, 1, 2, 0, 2, 3]);
	this.topPressedHover = new DrawBuffer(getButtonVertices(16, 7), getHalfButtonTexCoords(0, 3), [0, 1, 2, 0, 2, 3]);
	this.bottomNormal = new DrawBuffer(getButtonVertices(16, 7), getHalfButtonTexCoords(0, 4 + 0), [0, 1, 2, 0, 2, 3]);
	this.bottomPressedHover = new DrawBuffer(getButtonVertices(16, 7), getHalfButtonTexCoords(0, 4 + 3), [0, 1, 2, 0, 2, 3])
}
GUISpinnerButton.prototype.checkHover = function () {
	if (localMousePos[0] >= this.position[0] && localMousePos[1] >= this.position[1] && localMousePos[0] < (this.position[0] + this.width) && localMousePos[1] < (this.position[1] + this.width)) return 0;
	else if (localMousePos[0] >= this.position[0] && localMousePos[1] >= (this.position[1] - 7) && localMousePos[0] < (this.position[0] + this.width) && localMousePos[1] < this.position[1]) return 1;
	else if (localMousePos[0] >= this.position[0] && localMousePos[1] >= (this.position[1] + this.width) && localMousePos[0] < (this.position[0] + this.width) && localMousePos[1] < (this.position[1] + this.width + 8)) return 2;
	return - 1
};
GUISpinnerButton.prototype.mouseDown = function () {
	var hover = this.checkHover();
	if (hover == 0) _solidBG = !_solidBG;
	else if (hover == 1) {
		if (!_solidBG) {
			_currentBG++;
			if (_currentBG >= _backgrounds.length) _currentBG = 0
		} else {
			_currentColor++;
			if (_currentColor >= _colors.length) _currentColor = 0
		}
	} else if (hover == 2) {
		if (!_solidBG) {
			_currentBG--;
			if (_currentBG < 0) _currentBG = _backgrounds.length - 1
		} else {
			_currentColor--;
			if (_currentColor < 0) _currentColor = _colors.length - 1
		}
	}
};
GUISpinnerButton.prototype.draw = function () {
	mat4.translate(mvMatrix, [this.position[0], this.position[1], 0]);
	var hover = this.checkHover();
	if (hover == 0) {
		if (!_solidBG) this.middlePressedHover.Draw();
		else this.middleNormalHover.Draw()
	} else {
		if (!_solidBG) this.middlePressed.Draw();
		else this.middleNormal.Draw()
	}
	mat4.translate(mvMatrix, [0, -6, 0]);
	if (hover == 1) this.topPressedHover.Draw();
	else this.topNormal.Draw();
	mat4.translate(mvMatrix, [0, 6, 0]);
	mat4.translate(mvMatrix, [0, 15, 0]);
	if (hover == 2) this.bottomPressedHover.Draw();
	else this.bottomNormal.Draw();
	mat4.translate(mvMatrix, [0, -15, 0]);
	mat4.translate(mvMatrix, [ - this.position[0], -this.position[1], 0])
};
function GUIStandButton(row) {
	GUIButton.call(this, row)
}
function GUIStandButton_init() {
	GUIStandButton.prototype = new GUIButton;
	GUIStandButton.prototype.constructor = GUIStandButton;
	GUIStandButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIStandButton.prototype.isDown = function () {
		return base && !base.isRiding && !base.isSneak
	};
	GUIStandButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.isRiding = false;
			_maxSpeed = 0;
			base.isSneak = false;
			base.oldwalking = false;
			base.rotateHead = false;
			return true
		}
		return false
	}
};
function GUIRidingButton(row) {
	GUIButton.call(this, row)
}
function GUIRidingButton_init() {
	GUIRidingButton.prototype = new GUIButton;
	GUIRidingButton.prototype.constructor = GUIRidingButton;
	GUIRidingButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIRidingButton.prototype.isDown = function () {
		return base && base.isRiding
	};
	GUIRidingButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.isRiding = !base.isRiding;
			return true
		}
		return false
	}
};
function GUISneakButton(row) {
	GUIButton.call(this, row)
}
function GUISneakButton_init() {
	GUISneakButton.prototype = new GUIButton;
	GUISneakButton.prototype.constructor = GUISneakButton;
	GUISneakButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUISneakButton.prototype.isDown = function () {
		return base && base.isSneak
	};
	GUISneakButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.isSneak = !base.isSneak;
			return true
		}
		return false
	}
};
function GUIHeadBobButton(row) {
	this.displayRow = row;
	this.width = 16;
	this.normalDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 4), [0, 1, 2, 0, 2, 3]);
	this.normalHoverDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 5), [0, 1, 2, 0, 2, 3]);
	this.pressedDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 6), [0, 1, 2, 0, 2, 3]);
	this.pressedHoverDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(row, 7), [0, 1, 2, 0, 2, 3]);
	this.hover = false
}
function GUIHeadBobButton_init() {
	GUIHeadBobButton.prototype = new GUIButton;
	GUIHeadBobButton.prototype.constructor = GUIHeadBobButton;
	GUIHeadBobButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIHeadBobButton.prototype.isDown = function () {
		return base && base.rotatehead
	};
	GUIHeadBobButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.rotatehead = !base.rotatehead;
			return true
		}
		return false
	}
};
function GUIWalkButton(row) {
	GUIButton.call(this, row)
}
function GUIWalkButton_init() {
	GUIWalkButton.prototype = new GUIButton;
	GUIWalkButton.prototype.constructor = GUIWalkButton;
	GUIWalkButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIWalkButton.prototype.isDown = function () {
		return _maxSpeed == 0.055
	};
	GUIWalkButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			if (_maxSpeed != 0.055) _maxSpeed = 0.055;
			else _maxSpeed = 0;
			base.oldwalking = false;
			return true
		}
		return false
	}
};
function GUIRunButton(row) {
	GUIButton.call(this, row)
}
function GUIRunButton_init() {
	GUIRunButton.prototype = new GUIButton;
	GUIRunButton.prototype.constructor = GUIRunButton;
	GUIRunButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIRunButton.prototype.isDown = function () {
		return base && _maxSpeed == 0.08 && !base.oldwalking
	};
	GUIRunButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			if (_maxSpeed != 0.08 || base.oldwalking) _maxSpeed = 0.08;
			else _maxSpeed = 0;
			base.oldwalking = false;
			return true
		}
		return false
	}
};
function GUIOldWalkButton(row) {
	GUIButton.call(this, row)
}
function GUIOldWalkButton_init() {
	GUIOldWalkButton.prototype = new GUIButton;
	GUIOldWalkButton.prototype.constructor = GUIOldWalkButton;
	GUIOldWalkButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIOldWalkButton.prototype.isDown = function () {
		return base && _maxSpeed == 0.08 && base.oldwalking
	};
	GUIOldWalkButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			if (_maxSpeed != 0.08 || !base.oldwalking) {
				base.oldwalking = true;
				_maxSpeed = 0.08
			} else {
				_maxSpeed = 0;
				base.oldwalking = false
			}
			return true
		}
		return false
	}
};
function GUIAttackButton(row) {
	GUIButton.call(this, row)
}
function GUIAttackButton_init() {
	GUIAttackButton.prototype = new GUIButton;
	GUIAttackButton.prototype.constructor = GUIAttackButton;
	GUIAttackButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIAttackButton.prototype.isDown = function () {
		return true
	};
	GUIAttackButton.prototype.mouseDown = function () {
		if (this.hover) {
			swingItem();
			return true
		}
		return false
	}
};
function GUIBowButton(row) {
	GUIButton.call(this, row)
}
function GUIBowButton_init() {
	GUIBowButton.prototype = new GUIButton;
	GUIBowButton.prototype.constructor = GUIBowButton;
	GUIBowButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIBowButton.prototype.isDown = function () {
		return base && base.aimedBow
	};
	GUIBowButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.aimedBow = !base.aimedBow;
			return true
		}
		return false
	}
};
function GUIHelmetButton(row) {
	GUIButton.call(this, row)
}
function GUIHelmetButton_init() {
	GUIHelmetButton.prototype = new GUIButton;
	GUIHelmetButton.prototype.constructor = GUIHelmetButton;
	GUIHelmetButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIHelmetButton.prototype.isDown = function () {
		return base && !base.bipedHeadwear.isHidden
	};
	GUIHelmetButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.bipedHeadwear.isHidden = !base.bipedHeadwear.isHidden;
			return true
		}
		return false
	}
};
function GUIRightHandButton(row) {
	GUIButton.call(this, row)
}
function GUIRightHandButton_init() {
	GUIRightHandButton.prototype = new GUIButton;
	GUIRightHandButton.prototype.constructor = GUIRightHandButton;
	GUIRightHandButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIRightHandButton.prototype.isDown = function () {
		return base && base.heldItemRight != 0
	};
	GUIRightHandButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.heldItemRight = (base.heldItemRight != 0 ? 0 : 2);
			return true
		}
		return false
	}
};
function GUILeftHandButton(row) {
	GUIButton.call(this, row)
}
function GUILeftHandButton_init() {
	GUILeftHandButton.prototype = new GUIButton;
	GUILeftHandButton.prototype.constructor = GUILeftHandButton;
	GUILeftHandButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUILeftHandButton.prototype.isDown = function () {
		return base && base.heldItemLeft != 0
	};
	GUILeftHandButton.prototype.mouseDown = function () {
		if (this.hover && base) {
			base.heldItemLeft = (base.heldItemLeft != 0 ? 0 : 2);
			return true
		}
		return false
	}
};
function GUIStopButton() {
	this.width = 16;
	this.normalDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(0, 2), [0, 1, 2, 0, 2, 3]);
	this.normalHoverDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(0, 3), [0, 1, 2, 0, 2, 3]);
	this.pressedDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(2, 2), [0, 1, 2, 0, 2, 3]);
	this.pressedHoverDrawBuffer = new DrawBuffer(getButtonVertices(16, 16), getRegularButtonTexCoords(2, 3), [0, 1, 2, 0, 2, 3]);
	this.hover = false
}
function GUIStopButton_init() {
	GUIStopButton.prototype = new GUIButton;
	GUIStopButton.prototype.constructor = GUIStopButton;
	GUIStopButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUIStopButton.prototype.isDown = function () {
		return ! animating
	};
	GUIStopButton.prototype.mouseDown = function () {
		if (this.hover) {
			animating = !animating;
			return true
		}
		return false
	}
};
function GUITickButton(row) {
	GUIButton.call(this, row)
}
function GUITickButton_init() {
	GUITickButton.prototype = new GUIButton;
	GUITickButton.prototype.constructor = GUITickButton;
	GUITickButton.prototype.draw = function () {
		GUIButton.prototype.draw.call(this)
	};
	GUITickButton.prototype.isDown = function () {
		return ! animating
	};
	GUITickButton.prototype.mouseDown = function () {
		if (this.hover) {
			dotick = true;
			return true
		}
		return false
	}
};
GUISeparator.prototype = new GUIItem;
GUISeparator.prototype.constructor = GUISeparator;
function GUISeparator(size) {
	this.width = size
}
GUISeparator.prototype.draw = function () {};
function GUIToolbar() {
	this.buttons = [];
	this.position = [0, 0];
	this.width = 0
}
GUIToolbar.prototype.add = function (item) {
	this.buttons.push(item);
	item.parent = this
};
GUIToolbar.prototype.calculateItemPositions = function () {
	var tempX = 0;
	for (var item in this.buttons) {
		this.buttons[item].position = [this.position[0] + tempX, this.position[1]];
		tempX += this.buttons[item].width
	}
};
GUIToolbar.prototype.calculateWidth = function () {
	this.width = 0;
	for (var item in this.buttons) this.width += this.buttons[item].width
};
GUIToolbar.prototype.draw = function () {
	for (var item in this.buttons) this.buttons[item].draw()
};
GUIToolbar.prototype.mouseDown = function () {
	for (var item in this.buttons) {
		if (this.buttons[item].mouseDown && this.buttons[item].mouseDown()) return true
	}
	return false
};
var gl;
var skinUrl = null;
function initGL(canvas) {
	try {
		gl = WebGLUtils.setupWebGL(canvas);
		if (gl == null) return;
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height
	} catch(e) {}
}
function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) return null;
	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) str += k.textContent;
		k = k.nextSibling
	}
	var shader;
	if (shaderScript.type == "x-shader/x-fragment") shader = gl.createShader(gl.FRAGMENT_SHADER);
	else if (shaderScript.type == "x-shader/x-vertex") shader = gl.createShader(gl.VERTEX_SHADER);
	else return null;
	gl.shaderSource(shader, str);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null
	}
	return shader
}
var shaderProgram;
function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) alert("Could not initialise shaders");
	gl.useProgram(shaderProgram);
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
	shaderProgram.colorUniform = gl.getUniformLocation(shaderProgram, "uColor");
	shaderProgram.useColorUniform = gl.getUniformLocation(shaderProgram, "uUseColor")
}
function handleLoadedTexture(texture) {
	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.bindTexture(gl.TEXTURE_2D, null)
}
function makeTexture(url) {
	var texture = gl.createTexture();
	texture.image = new Image();
	texture.loaded = false;
	texture.image.onload = function () {
		texture.loaded = true;
		handleLoadedTexture(texture)
	};
	texture.image.onerror = function () {
		stopPreviewer()
	};
	texture.image.crossOrigin = texture.image.crossorigin = "anonymous";
	texture.image.src = url;
	return texture
}
var buttonTexture, bodyTex;
var _solidBG = false;
var _backgrounds = [];
var _backgroundsToAdd = [];
var _currentBG = 0;
var _currentColor = 0;
var _colors = [];
var basePath = "previewer_resources";
_colors.push([0, 0, 0, 1]);
_colors.push([1, 1, 1, 1]);
_colors.push([0.62, 0.69, 0.87, 1]);
_colors.push([0.50, 0, 0, 1]);
_colors.push([0.45, 0.90, 0, 1]);
function addBackground(url) {
	_backgrounds.push(makeTexture(url))
}
function preloadBackground(url) {
	_backgroundsToAdd.push(url)
}
function initTexture() {
	buttonTexture = makeTexture(basePath + "/stop_strip.png");
	bodyTex = makeTexture((!skinUrl) ? (basePath + "/char.png") : skinUrl);
	for (var i = 0; i < _backgroundsToAdd.length; ++i) addBackground(_backgroundsToAdd[i]);
	for (var i = 1; i <= 13; ++i) addBackground((basePath + "/bg") + i + ".jpg")
}
var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();
function mvPushMatrix() {
	var copy = mat4.create();
	mat4.set(mvMatrix, copy);
	mvMatrixStack.push(copy)
}
function mvPopMatrix() {
	if (mvMatrixStack.length == 0) throw "Invalid popMatrix!";
	mvMatrix = mvMatrixStack.pop()
}
function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix)
}
function setColor(color) {
	gl.uniform4fv(shaderProgram.colorUniform, color)
}
function degToRad(degrees) {
	return degrees * Math.PI / 180
}
var backgroundBuffer;
var testRenderer;
var toolbar;
var base;
function initBuffers() {
	vertices = [0.0, 0.0, 320.0, 0.0, 320.0, 320.0, 0.0, 320.0];
	var textureCoords = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
	var cubeVertexIndices = [0, 1, 2, 0, 2, 3];
	backgroundBuffer = new DrawBuffer(vertices, textureCoords, cubeVertexIndices);
	GUIStandButton_init();
	GUIRidingButton_init();
	GUISneakButton_init();
	GUIHeadBobButton_init();
	GUIWalkButton_init();
	GUIRunButton_init();
	GUIOldWalkButton_init();
	GUIAttackButton_init();
	GUIBowButton_init();
	GUIHelmetButton_init();
	GUIRightHandButton_init();
	GUILeftHandButton_init();
	GUIStopButton_init();
	GUITickButton_init();
	toolbar = new GUIToolbar();
	toolbar.add(new GUIStandButton(4));
	toolbar.add(new GUIRidingButton(3));
	toolbar.add(new GUISneakButton(11));
	toolbar.add(new GUIHeadBobButton(0));
	toolbar.add(new GUISeparator(3));
	toolbar.add(new GUIWalkButton(5));
	toolbar.add(new GUIRunButton(6));
	toolbar.add(new GUIOldWalkButton(15));
	toolbar.add(new GUISeparator(3));
	toolbar.add(new GUIAttackButton(12));
	toolbar.add(new GUIBowButton(7));
	toolbar.add(new GUIHelmetButton(14));
	toolbar.add(new GUIRightHandButton(8));
	toolbar.add(new GUILeftHandButton(9));
	toolbar.add(new GUISeparator(3));
	toolbar.add(new GUIStopButton(0));
	toolbar.add(new GUITickButton(1));
	toolbar.add(new GUISeparator(3));
	toolbar.add(new GUISpinnerButton(13));
	toolbar.calculateWidth();
	toolbar.position = [(320 / 2) - (toolbar.width / 2), 320 - 24];
	toolbar.calculateItemPositions();
	_maxSpeed = 0.08
}
function drawBuffers(buffer, texture) {
	if (texture) {
		if (!texture.loaded) return;
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.uniform1i(shaderProgram.samplerUniform, 0)
	}
	buffer.Draw()
}
function setup2D() {
	mat4.ortho(0, gl.viewportWidth, gl.viewportHeight, 0, -1, 1, pMatrix);
	mat4.identity(mvMatrix);
	gl.disable(gl.DEPTH_TEST)
}
function setup3D() {
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 1, 1000, pMatrix);
	mat4.identity(mvMatrix);
	gl.enable(gl.DEPTH_TEST)
}
var zoom = -60;
var rotX = 0,
rotY = Math.PI;
var animating = true;
var dotick = false;
var anim = 0;
var _maxSpeed = 0;
var _currentSpeed = 0;
var _walkCount = 0;
var field_705_Q, field_704_R = 0,
field_703_S = 0;
var _incSpeed = 0.008;
var _centerOffset = 0;
var prevSwingProgress = 0;
var isSwinging = false;
var swingProgressInt = 0;
var swingProgress = 0;
var showBar = true;
function getSwingProgress(f) {
	var f1 = swingProgress - prevSwingProgress;
	if (f1 < 0.0) f1++;
	return prevSwingProgress + f1 * f
}
function getSwingSpeedModifier() {
	return 6 * 3
}
function update() {
	prevSwingProgress = swingProgress;
	var i = getSwingSpeedModifier();
	if (isSwinging) {
		swingProgressInt++;
		if (swingProgressInt >= i) {
			swingProgressInt = 0;
			isSwinging = false
		}
	} else swingProgressInt = 0;
	swingProgress = swingProgressInt / i
}
function swingItem() {
	if (!isSwinging || swingProgressInt >= getSwingSpeedModifier() / 2 || swingProgressInt < 0) {
		swingProgressInt = -1;
		isSwinging = true
	}
}
var frameCount = 0;
var then = 0.0;
function drawScene() {++frameCount;
	var now = (new Date()).getTime() * 0.001;
	var elapsedTime;
	if (then == 0.0) {
		elapsedTime = 0.0
	} else {
		elapsedTime = now - then
	}
	then = now;
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	setup2D();
	if (_solidBG) {
		gl.uniform1i(shaderProgram.useColorUniform, true);
		setColor(_colors[_currentColor])
	}
	drawBuffers(backgroundBuffer, _backgrounds[_currentBG]);
	if (_solidBG) gl.uniform1i(shaderProgram.useColorUniform, false);
	setup3D();
	if (bodyTex.loaded) {
		if (!base) {
			base = new ModelBiped(0, 0, bodyTex.image);
			base.oldwalking = true
		}
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, bodyTex);
		gl.uniform1i(shaderProgram.samplerUniform, 0);
		if (animating || dotick) {
			anim += (elapsedTime / .035);
			dotick = false;
			var max = _maxSpeed;
			if (base.isSneak) max /= 2;
			if (max != 0) {
				if (_currentSpeed < max) _currentSpeed += _incSpeed * (elapsedTime / .040);
				if (_currentSpeed > max) _currentSpeed = max
			} else if (_currentSpeed > 0) {
				_currentSpeed -= _incSpeed * (elapsedTime / .040);
				if (_currentSpeed < 0) _currentSpeed = 0
			}
			field_705_Q = field_704_R;
			var f = _currentSpeed * 4;
			if (f > 1.0) f = 1.0;
			field_704_R += (f - field_704_R);
			field_703_S += field_704_R;
			update()
		}
		var f7 = field_705_Q + (field_704_R - field_705_Q) * 0.5;
		var f8 = field_703_S - field_704_R * (1.0 - 0.5);
		if (f7 > 1.0) f7 = 1.0;
		var yOffs = _centerOffset;
		if (base.oldwalking && !base.isRiding && !base.isSneak) yOffs += ( - Math.abs(Math.cos((f8 * (base.oldwalking ? 0.5 : 1)) * 0.6662)) * 5.0);
		else if (base.isSneak) yOffs += 3.0;
		mat4.translate(mvMatrix, [0, -8 + yOffs, zoom]);
		mat4.translate(mvMatrix, [0, 8 - yOffs, 0]);
		mat4.rotate(mvMatrix, -rotY, [1, 0, 0]);
		mat4.rotate(mvMatrix, -rotX, [0, 1, 0]);
		mat4.translate(mvMatrix, [0, -8 + yOffs, 0]);
		base.onGround = getSwingProgress(0);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);
		base.render(f8 * (base.oldwalking ? 0.5 : 1), f7 * (base.oldwalking ? 3 : 2), anim, 0, 0, 1);
		gl.cullFace(gl.BACK);
		base.render(f8 * (base.oldwalking ? 0.5 : 1), f7 * (base.oldwalking ? 3 : 2), anim, 0, 0, 1);
		gl.disable(gl.CULL_FACE)
	}
	if (showBar && buttonTexture.loaded) {
		setup2D();
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, buttonTexture);
		gl.uniform1i(shaderProgram.samplerUniform, 0);
		toolbar.draw()
	}
}
var lastId = -1;
function stopPreviewer() {
	cancelRequestAnimFrame(lastId);
	previewerCanvas.parentNode.removeChild(previewerCanvas);
	previewerCanvas = null
}
function tick() {
	lastId = requestAnimFrame(tick);
	drawScene()
}
function findPos(obj) {
	var obj2 = obj;
	var curtop = 0;
	var curleft = 0;
	if (document.getElementById || document.all) {
		do {
			curleft += obj.offsetLeft - obj.scrollLeft;
			curtop += obj.offsetTop - obj.scrollTop;
			obj = obj.offsetParent;
			obj2 = obj2.parentNode;
			while (obj2 != obj) {
				curleft -= obj2.scrollLeft;
				curtop -= obj2.scrollTop;
				obj2 = obj2.parentNode
			}
		} while (obj.offsetParent)
	} else if (document.layers) {
		curtop += obj.y;
		curleft += obj.x
	}
	return [curleft, curtop]
}
var mousePosition = [0, 0];
var localMousePos = [0, 0];
var dragging = false;
var buttonPressed = 0;
function onMouseWheel(e) {
	var delta = e.detail ? (e.detail * -120) : e.wheelDelta;
	if (delta == 0) return false;
	zoom += ((delta > 0) ? 1 : -1) * 10;
	if (zoom > -40) zoom = -40;
	else if (zoom < -120) zoom = -120;
	return false
};
function wheelOff(event) {
	var delta = 0;
	if (!event) event = window.event;
	if (event.wheelDelta) {
		delta = event.wheelDelta / 120
	} else if (event.detail) {
		delta = -event.detail / 3
	}
	if (event.preventDefault) event.preventDefault();
	event.returnValue = false
}
function wheelOn(event) {
	var delta = 0;
	if (!event) event = window.event;
	if (event.wheelDelta) {
		delta = event.wheelDelta / 120
	} else if (event.detail) {
		delta = -event.detail / 3
	}
	if (event.preventDefault) {
		event.returnValue = true
	}
	return true
}
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	var dataURL = canvas.toDataURL("image/png");
	return dataURL.replace(/^data:image\/(png|jpg);base64,/, "")
}
function initEvents(canvas) {
	document.onmousemove = function (ev) {
		if (!previewerCanvas) return;
		var pos = findPos(canvas);
		var newPos = [ev.clientX - pos[0], ev.clientY - pos[1]];
		if (dragging) {
			var delta = [mousePosition[0] - newPos[0], mousePosition[1] - newPos[1]];
			if (buttonPressed == 1) {
				rotX -= delta[0] / 100;
				rotY += delta[1] / 100
			} else {
				_centerOffset -= delta[1] / 10.0;
				if (_centerOffset > 12) _centerOffset = 12;
				else if (_centerOffset < 0) _centerOffset = 0
			}
		}
		mousePosition = newPos
	};
	canvas.onmousemove = function (ev) {
		if (!previewerCanvas) return;
		var pos = findPos(canvas);
		var newPos = [ev.pageX - pos[0], ev.pageY - pos[1]];
		localMousePos = newPos
	};
	canvas.ondblclick = function (e) {
		e.preventDefault();
		return false
	};
	canvas.onmousedown = function (ev) {
		if (!previewerCanvas) return;
		if (!toolbar.mouseDown()) {
			dragging = true;
			if (ev.button) buttonPressed = ev.button;
			else if (ev.which) buttonPressed = ev.which;
			else buttonPressed = 1
		}
		if (!e) var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		return false
	};
	document.onmouseup = function (ev) {
		if (!previewerCanvas) return;
		dragging = false;
		buttonPressed = 0
	};
	canvas.oncontextmenu = function (ev) {
		return false
	};
	canvas.onmouseover = function (e) {
		if (window.addEventListener) {
			window.removeEventListener('DOMMouseScroll', wheelOn, false);
			window.addEventListener('DOMMouseScroll', wheelOff, false)
		}
		window.onmousewheel = document.onmousewheel = wheelOff
	};
	canvas.onmouseout = function (e) {
		if (window.addEventListener) {
			window.removeEventListener('DOMMouseScroll', wheelOff, false);
			window.addEventListener('DOMMouseScroll', wheelOn, false)
		}
		window.onmousewheel = document.onmousewheel = wheelOn
	};
	canvas.focused = false;
	canvas.hasFocus = function () {
		return this.focused
	};
	canvas.onfocus = function () {
		this.focused = true
	};
	canvas.onblur = function () {
		this.focused = false
	};
	document.body.onkeypress = function (e) {
		if (!previewerCanvas) return;
		if (!canvas.focused) return true;
		var keynum;
		var keychar;
		if (window.event) keynum = e.keyCode;
		else if (e.which) keynum = e.which;
		keychar = String.fromCharCode(keynum);
		if (keychar == 'h') {
			showBar = !showBar;
			return false
		} else if (keychar == 'p') {
			var img = canvas.toDataURL();
			window.open(img, "Screenshot");
			return false
		}
	};
	var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll": "mousewheel";
	if (canvas.attachEvent) canvas.attachEvent("on" + mousewheelevt, function (e) {
		return onMouseWheel(e)
	});
	else if (canvas.addEventListener) canvas.addEventListener(mousewheelevt, function (e) {
		return onMouseWheel(e)
	},
	false)
}
var previewerCanvas;
function webGLStart() {
	var canvas = previewerCanvas = document.getElementById("glCanvas");
	initGL(canvas);
	initShaders();
	initBuffers();
	initTexture();
	initEvents(canvas);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	tick()
}