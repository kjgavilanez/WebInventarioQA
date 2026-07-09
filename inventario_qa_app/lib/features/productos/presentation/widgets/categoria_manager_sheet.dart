import 'package:flutter/material.dart';

import '../../../../core/theme/app_theme.dart';
import '../../../../shared/widgets/app_toast.dart';
import '../../../../shared/widgets/confirm_dialog.dart';
import '../../data/models/producto.dart';
import '../../data/repositories/categoria_repository.dart';

Future<void> showCategoriaManagerSheet({
  required BuildContext context,
  required CategoriaRepository repository,
  required Future<void> Function() onChanged,
}) async {
  await showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    backgroundColor: AppColors.surface,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
    ),
    builder: (ctx) => _CategoriaManagerSheet(
      repository: repository,
      onChanged: onChanged,
    ),
  );
}

class _CategoriaManagerSheet extends StatefulWidget {
  const _CategoriaManagerSheet({
    required this.repository,
    required this.onChanged,
  });
  final CategoriaRepository repository;
  final Future<void> Function() onChanged;

  @override
  State<_CategoriaManagerSheet> createState() => _CategoriaManagerSheetState();
}

class _CategoriaManagerSheetState extends State<_CategoriaManagerSheet> {
  List<Categoria> _items = [];
  bool _cargando = true;
  final _controller = TextEditingController();
  String? _error;

  @override
  void initState() {
    super.initState();
    _cargar();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> _cargar() async {
    try {
      final list = await widget.repository.listar();
      if (!mounted) return;
      setState(() {
        _items = list;
        _cargando = false;
      });
    } catch (_) {
      if (!mounted) return;
      setState(() => _cargando = false);
    }
  }

  Future<void> _crear() async {
    final nombre = _controller.text.trim();
    if (nombre.isEmpty) {
      setState(() => _error = 'El nombre es requerido');
      return;
    }
    try {
      await widget.repository.crear(nombre: nombre);
      _controller.clear();
      setState(() => _error = null);
      await _cargar();
      await widget.onChanged();
      if (!mounted) return;
      showAppToast(context, 'Categoría creada correctamente');
    } catch (e) {
      setState(() => _error = 'No se pudo crear la categoría');
    }
  }

  Future<void> _eliminar(int id) async {
    final ok = await showAppConfirmDialog(
      context,
      mensaje:
          '¿Eliminar esta categoría? No podrás eliminarla si tiene productos asociados.',
      confirmar: 'Eliminar',
    );
    if (!ok) return;
    try {
      await widget.repository.eliminar(id);
      await _cargar();
      await widget.onChanged();
      if (!mounted) return;
      showAppToast(context, 'Categoría eliminada correctamente');
    } catch (_) {
      if (!mounted) return;
      showAppToast(
        context,
        'No se puede eliminar una categoría con productos asociados',
        error: true,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                const Expanded(
                  child: Text(
                    'Gestionar Categorías',
                    style: TextStyle(
                      color: AppColors.textPrimary,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                IconButton(
                  onPressed: () => Navigator.of(context).pop(),
                  icon: const Icon(Icons.close, color: AppColors.textMuted),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      labelText: 'Nueva categoría',
                      errorText: _error,
                      isDense: true,
                    ),
                    onSubmitted: (_) => _crear(),
                  ),
                ),
                const SizedBox(width: 8),
                ElevatedButton(onPressed: _crear, child: const Text('Agregar')),
              ],
            ),
            const SizedBox(height: 16),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Categorías existentes',
                style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
              ),
            ),
            const SizedBox(height: 8),
            Flexible(
              child: _cargando
                  ? const Padding(
                      padding: EdgeInsets.all(20),
                      child: Center(child: CircularProgressIndicator()),
                    )
                  : _items.isEmpty
                      ? const Padding(
                          padding: EdgeInsets.all(20),
                          child: Text(
                            'No hay categorías',
                            style: TextStyle(color: AppColors.textMuted, fontSize: 13),
                          ),
                        )
                      : ListView.separated(
                          shrinkWrap: true,
                          itemCount: _items.length,
                          separatorBuilder: (_, _) => const SizedBox(height: 6),
                          itemBuilder: (_, i) {
                            final c = _items[i];
                            return Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 14,
                                vertical: 10,
                              ),
                              decoration: BoxDecoration(
                                color: AppColors.surfaceAlt,
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(color: AppColors.border),
                              ),
                              child: Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      c.nombre,
                                      style: const TextStyle(
                                        color: AppColors.textPrimary,
                                        fontSize: 14,
                                      ),
                                    ),
                                  ),
                                  IconButton(
                                    onPressed: () => _eliminar(c.id),
                                    icon: const Text('🗑️', style: TextStyle(fontSize: 16)),
                                    color: AppColors.danger,
                                  ),
                                ],
                              ),
                            );
                          },
                        ),
            ),
            const SizedBox(height: 8),
            OutlinedButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cerrar'),
            ),
          ],
        ),
      ),
    );
  }
}
